# Step 5: Wire Prototype Interactions

## What Happens Here

`tools/flow-wirer.js` reads `prototype-spec.yaml` and wires all prototype interactions into the Penpot file via the REST API — making the prototype clickable.

**Prerequisite:** Step 4 (Build Screens) must be complete and `prototype-spec.yaml → penpot.file_id` must be set.

---

## Agent: @ux-prototyper

### Verify prototype-spec.yaml

Before running the script, confirm:
- `penpot.file_id` is set (the Penpot file UUID from Step 4)
- `flows` array is complete with source/target frame names that exactly match Penpot
- `trigger_element` names match element names inside their respective frames
- At minimum, the primary happy path flows are defined

### Run flow-wirer.js

```bash
cd tools
npm install          # first time only
node flow-wirer.js --spec ../prototype-spec.yaml
```

The script will:
1. Connect to Penpot using the configured URL and access token
2. Fetch all frames from the prototype file
3. For each flow: find source frame, find trigger element (or use whole frame), set interaction pointing to target frame
4. Report success/failure per flow

### Handle Failures

If flows fail:
- **"Source frame X not found"** — frame name mismatch. Check exact name in Penpot layer panel
- **"Trigger element X not found"** — element name mismatch inside the frame. Check Penpot layer panel
- **401 Unauthorized** — access token invalid. Regenerate at Penpot → Profile → Access Tokens
- Script falls back to frame-level trigger (whole frame clickable) if element not found

### Verify in Penpot

After the script completes:
1. Open the Penpot prototype file
2. Press ▶ (Play button top right) to enter preview mode
3. Click through the primary happy path end-to-end
4. Verify transitions look correct
5. Fix any broken connections in `prototype-spec.yaml` and re-run the script

---

## Quality Gate

Before moving to Step 6:

- [ ] flow-wirer.js ran without fatal errors
- [ ] Primary happy path is fully clickable in Penpot prototype mode
- [ ] At least one error/edge case flow is wired
- [ ] All reported failures are investigated and either fixed or documented

---

## Output

Penpot Prototype file with clickable interactions — ready for validation.

## Proceed To

Step 6 (Validation Gate).
