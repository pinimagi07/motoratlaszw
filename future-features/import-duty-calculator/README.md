# Motor Atlas — Zimbabwe Import Duty Calculator (Future Feature)

Status: **Planning only — not active on the live website.**

This folder is reserved for a future Zimbabwe vehicle import / landed-cost calculator for Motor Atlas.

## Core requirements captured

- The calculator should be attached to individual Motor Atlas vehicle pages/cards and automatically inherit known vehicle data such as make, model, year/manufacturing date, fuel type, engine size and body type.
- The final system should use **live / current market values and current import-cost inputs**, not a permanently hard-coded estimated vehicle value.
- The age of the vehicle must be checked before calculating an ordinary import result.
- Standard-import age eligibility must be validated against the Zimbabwe rule in force at launch. If a vehicle is older than the permitted age, the calculator should stop and clearly tell the viewer that the vehicle is not eligible for ordinary import into Zimbabwe.
- Vintage/classic vehicles require a separate eligibility path. The intended exception is for qualifying vintage vehicles kept in their original state; the exact legal definition, age threshold, documentation and current Zimbabwe rules must be verified before this path is enabled.
- Motor Atlas currently has no vintage-car catalogue, so vintage support is a later extension rather than part of the first calculator release.

## Planned result

For an eligible vehicle, the future calculator should show a transparent breakdown from purchase/source-market value through freight, insurance, customs valuation, Zimbabwe duties/taxes, clearance and inland transport, ending with an estimated or live landed cost to Zimbabwe depending on the connected data sources available at launch.

## Important implementation rule

Do not hard-code tax, duty, shipping or eligibility rules permanently. Keep them in an updateable rules/data layer so current ZIMRA rates, tariff rules, exchange rates, shipping quotes and market values can be refreshed without rebuilding the whole catalogue.

No production code should be connected to this folder until the feature is intentionally started and the current Zimbabwe import rules and data sources have been verified.
