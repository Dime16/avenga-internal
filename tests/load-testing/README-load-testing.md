# Load Testing Guidelines

## Setup steps

```bash
# macOS
brew install k6

# Windows (via Chocolatey)
choco install k6
```

## Run the test

```bash
k6 run --out web-dashboard rps-test.js
```
