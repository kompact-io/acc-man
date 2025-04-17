# Get help
help:
  just -l

# Convert schemas to types for type hints
schemas2types:
  pnpm prettier schemas.json -w
  pnpm json2ts -i schemas.json -o src/schemaTypes.d.ts --unreachableDefinitions

