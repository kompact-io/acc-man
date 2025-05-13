base_url:=env('ACCMAN_URL', "http://127.0.0.1:22262")

# Get help
help:
  just -l

# Convert schemas to types for type hints
schemas2types:
  pnpm prettier schemas.json -w
  pnpm json2ts -i schemas.json -o src/schemaTypes.d.ts --unreachableDefinitions

# tot
tot cred:
  curl -X GET "{{base_url}}/tot?cred={{cred}}" -w "\n"

# mod
mod cred by:
  curl -X PATCH "{{base_url}}/mod?cred={{cred}}&by={{by}}" -w "\n"
