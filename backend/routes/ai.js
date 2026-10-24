const express = require('express');
const router = express.Router();

// simple stub that "classifies" text — replace with real Gemini call
router.post('/gemini', async (req,res)=>{
  const { text } = req.body;
  // very tiny heuristic demo
  const lower = (text||'').toLowerCase();
  let category = 'General';
  let urgency = 'Low';
  if (lower.includes('water') || lower.includes('flood') || lower.includes('sewer')) { category='Sewage/Water'; urgency='High'; }
  else if (lower.includes('pothole') || lower.includes('road')) { category='Road/Pothole'; urgency='Medium'; }

  res.json({ category, urgency, summary: text ? text.slice(0,120) : '' });
});

module.exports = router;
