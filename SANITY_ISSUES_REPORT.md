# Sanity Studio "Reset Value" and "Missing Keys" Errors - Investigation Report

## Summary of Issues Found

After investigating the Sanity Studio errors, I found the following issues:

### 1. Null Image Fields
All pages had `null` values for image fields:
- `seo.image: null` on all pages
- `hero.image: null` on homePage
- `aboutSection.image: null` on homePage
- Missing `personalJourney.image` and `professionalEvolution.image` on aboutPage

**Why this is a problem**: Sanity Studio expects image fields to either:
- Have a proper image object with asset reference
- Be undefined (field not present)
- NOT be explicitly `null`

### 2. Required Field Validation
The `hero.heading` field in the homePage schema has a validation rule making it required:
```typescript
validation: (Rule: any) => Rule.required()
```

This could cause issues if the field is empty or missing.

## Solutions Implemented

### 1. Fixed Existing Data (✅ Completed)
Created and ran `scripts/fix-sanity-data.js` which:
- Removed all `null` values from image fields
- Ensured all required fields have values
- Maintained all other data intact

**Result**: The homePage document was successfully updated, removing null values.

### 2. Updated Migration Script (✅ Completed)
Created `scripts/migrate-to-sanity-fixed.js` which:
- Removes all `image: null` assignments
- Lets Sanity handle undefined image fields properly

## How to Use the Fixes

### If you're still seeing errors in Sanity Studio:

1. **Restart Sanity Studio**:
   ```bash
   cd sanity
   npm run dev
   ```

2. **Clear browser cache** and refresh the Studio page

3. **If errors persist**, run the migration again with the fixed script:
   ```bash
   node scripts/migrate-to-sanity-fixed.js
   ```

### For future migrations:
Always use the fixed migration script (`migrate-to-sanity-fixed.js`) instead of the original one.

## Optional: Make Images Explicitly Optional in Schemas

If you want to make it clearer that image fields are optional, you can add validation rules to your schema files:

```typescript
{
  name: 'image',
  title: 'Social Share Image',
  type: 'image',
  validation: (Rule: any) => Rule.optional()
}
```

## Verification Scripts Created

1. **`scripts/check-sanity-issues.js`** - Analyzes all documents for missing fields and null values
2. **`scripts/inspect-sanity.js`** - Shows raw document data from Sanity

Run these anytime to verify your data integrity:
```bash
node scripts/check-sanity-issues.js
```

## Root Cause

The errors occurred because the original migration script explicitly set image fields to `null`. Sanity Studio interprets this differently than undefined fields and expects null fields to be "reset" to a proper value, hence the "reset value" error message.

## Prevention

For future schema additions:
1. Never explicitly set fields to `null` in migrations
2. Only include fields that have actual values
3. Let Sanity handle undefined fields naturally
4. Add validation rules to make optional fields explicit