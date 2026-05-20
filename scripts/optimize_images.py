#!/usr/bin/env python3
"""
Build step: copy site to _dist/ and optimize images/*.jpg (+ .webp).
Run from repository root: python scripts/optimize_images.py
"""

from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "_dist"
SRC_IMAGES = ROOT / "images"

# Keep in sync with HERO_IMAGES in translations.js
HERO_FILENAMES = {
    "Полагане на бетонова настилка.jpg",
    "Имитация на камък_(3).jpg",
    "Имитация на плочки_(4).jpg",
    "Имитация на павета_(1).jpg",
    "Имитация на дърво_(2).jpg",
    "Имитация на камък_.jpg",
    "Полагане на бетон_.jpg",
}

SKIP_TOP_LEVEL = {
    ".git",
    "_dist",
    ".github",
    "scripts",
    "__pycache__",
    ".cursor",
}

HERO_MAX_EDGE = 1920
GALLERY_MAX_EDGE = 1400
JPEG_QUALITY = 85
WEBP_QUALITY = 85


def resize_if_needed(img: Image.Image, max_edge: int) -> Image.Image:
    w, h = img.size
    if max(w, h) <= max_edge:
        return img
    if w >= h:
        new_w = max_edge
        new_h = round(h * max_edge / w)
    else:
        new_h = max_edge
        new_w = round(w * max_edge / h)
    return img.resize((new_w, new_h), Image.Resampling.LANCZOS)


def copy_site_files() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True)

    for item in ROOT.iterdir():
        if item.name in SKIP_TOP_LEVEL or item.name.startswith("."):
            continue
        if item.name == "images":
            continue
        dest = DIST / item.name
        if item.is_dir():
            shutil.copytree(item, dest)
        else:
            shutil.copy2(item, dest)

    (DIST / "images").mkdir(parents=True, exist_ok=True)

    nojekyll = ROOT / ".nojekyll"
    if nojekyll.is_file():
        shutil.copy2(nojekyll, DIST / ".nojekyll")


def optimize_image(src: Path, dest_jpg: Path, dest_webp: Path) -> tuple[int, int]:
    max_edge = HERO_MAX_EDGE if src.name in HERO_FILENAMES else GALLERY_MAX_EDGE

    with Image.open(src) as img:
        img = ImageOps_exif_safe(img)
        img = resize_if_needed(img, max_edge)
        if img.mode not in ("RGB", "L"):
            img = img.convert("RGB")

        img.save(
            dest_jpg,
            "JPEG",
            quality=JPEG_QUALITY,
            optimize=True,
            progressive=True,
        )
        img.save(dest_webp, "WEBP", quality=WEBP_QUALITY, method=6)

    return dest_jpg.stat().st_size, dest_webp.stat().st_size


def ImageOps_exif_safe(img: Image.Image) -> Image.Image:
    try:
        from PIL import ImageOps

        return ImageOps.exif_transpose(img)
    except Exception:
        return img


def main() -> None:
    copy_site_files()

    total_jpg_before = 0
    total_jpg_after = 0
    total_webp = 0
    count = 0

    for src in sorted(SRC_IMAGES.glob("*.jpg")):
        dest_jpg = DIST / "images" / src.name
        dest_webp = dest_jpg.with_suffix(".webp")
        before = src.stat().st_size
        jpg_size, webp_size = optimize_image(src, dest_jpg, dest_webp)
        total_jpg_before += before
        total_jpg_after += jpg_size
        total_webp += webp_size
        count += 1
        print(f"  {src.name}: {before // 1024} KB -> JPEG {jpg_size // 1024} KB, WebP {webp_size // 1024} KB")

    print(f"\nOptimized {count} images")
    print(f"  Original JPG total: {total_jpg_before / 1024 / 1024:.1f} MB")
    print(f"  Built JPEG total:   {total_jpg_after / 1024 / 1024:.1f} MB")
    print(f"  Built WebP total:   {total_webp / 1024 / 1024:.1f} MB")
    print(f"  Output directory:   {DIST}")


if __name__ == "__main__":
    main()
