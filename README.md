# Decorfloors

Визитка за щампован и шлайфан бетон — статичен сайт с BG/EN, тъмна/светла тема.

## Локален преглед

```powershell
cd decorfloors
python -m http.server 8765
```

Отвори `http://localhost:8765` — локално се зареждат оригиналните JPG (по-тежки). WebP се генерират при deploy.

## Build (същото като GitHub Actions)

```powershell
pip install -r scripts/requirements.txt
python scripts/optimize_images.py
cd _dist
python -m http.server 8765
```

## Deploy с GitHub Actions + WebP

1. Качи кода в GitHub (`main` branch).
2. **Settings → Pages → Build and deployment → Source:** избери **GitHub Actions** (не „Deploy from branch“).
3. При всеки push към `main` workflow-ът `.github/workflows/pages.yml`:
   - копира сайта в `_dist/`
   - resize + JPEG optimize + **WebP** за всички `images/*.jpg`
   - deploy-ва `_dist/` към Pages

Оригиналите остават в `images/` в git; оптимизираните файлове са само в artifact-а (не се commit-ват).

### Какво се генерира

| Тип | Hero снимки | Галерия |
|-----|-------------|---------|
| Max страна | 1920 px | 1400 px |
| JPEG quality | 85% | 85% |
| WebP quality | 85% | 85% |

Браузърът ползва WebP, ако поддържа; иначе JPEG fallback (`<picture>`).

## Домейн

`CNAME` → `decorfloors.eu`. DNS: 4× A записа към GitHub + CNAME `www` → `USERNAME.github.io`.
