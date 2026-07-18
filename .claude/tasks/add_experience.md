# Add Experience Tab and Component (Updated)

## Goal Description
The objective was to update the "Experience" section to match the resume and add a navigation tab for it in the Navbar.

## Changes Completed

### Navigation Updates (`Navbar.jsx`)
- Added `"experience"` to the array of sections for both desktop and mobile navigation links.
- It is now correctly positioned between `"skills"` and `"projects"`.

### Experience Component Updates (`Skills.jsx`)
- Replaced the existing text in the `experiences` array with the exact bullet points provided in the reference image (which match the resume).
- Updated the company headers to match the formatting exactly (e.g. `Zenup Health - Malad, Mumbai`).
- Added `id="experience"` to the parent `div` of the Experience section to allow smooth scrolling from the navigation bar.

## Verification
- Verified that the Navbar tab "Experience" is present.
- Verified that clicking it scrolls to the correct Experience section ID.
- Confirmed that the text bullet points precisely match the provided image.
