function t() { return (window.__i18n && window.__i18n.t) || {}; }

function calculate() {
  const tr = t();
  const age = parseFloat(document.getElementById('age').value);
  const sex = document.getElementById('sex').value;
  let creat = parseFloat(document.getElementById('creat').value);
  const unit = document.getElementById('unit').value;
  if (!age || !sex || !creat) { alert(tr.alertFill || 'Please fill in age, sex, and serum creatinine.'); return; }
  if (age < 18) { alert(tr.alertAge || 'This calculator is validated for adults aged 18 and older.'); return; }
  if (unit === 'umol') creat = creat / 88.42;
  const isFemale = sex === 'female';
  const kappa = isFemale ? 0.7 : 0.9;
  const alpha = isFemale ? -0.241 : -0.302;
  const ratio = creat / kappa;
  const minVal = Math.min(ratio, 1);
  const maxVal = Math.max(ratio, 1);
  let egfr = 142 * Math.pow(minVal, alpha) * Math.pow(maxVal, -1.200) * Math.pow(0.9938, age);
  if (isFemale) egfr *= 1.012;
  egfr = Math.round(egfr * 10) / 10;
  const stage = classifyStage(egfr);
  renderResult(egfr, stage, tr);
}

function classifyStage(egfr) {
  if (egfr >= 90) return 'G1';
  if (egfr >= 60) return 'G2';
  if (egfr >= 45) return 'G3a';
  if (egfr >= 30) return 'G3b';
  if (egfr >= 15) return 'G4';
  return 'G5';
}

function renderResult(egfr, stage, tr) {
  const result = document.getElementById('result');
  result.className = '';
  result.classList.add('show', 'stage-' + stage.toLowerCase());
  document.getElementById('egfrValue').textContent = egfr;
  document.getElementById('stageText').textContent = stage;
  const stageMeanings = tr.stageMeanings || {};
  document.getElementById('interpretation').textContent = stageMeanings[stage] || '';
  document.getElementById('interpretNote').textContent = tr.interpretSuffix || '';
}

function recalcIfVisible() {
  const result = document.getElementById('result');
  if (result && result.classList.contains('show')) calculate();
}

window.calculate = calculate;
window.recalcIfVisible = recalcIfVisible;