export function dateTime() {
  const dateObj = new Date();

  const dd = String(dateObj.getDate()).padStart(2, "");
  const mm = String(dateObj.getMonth() + 1).padStart(2, "");
  const yy = String(dateObj.getFullYear());

  const h = String(dateObj.getHours()).padStart(2, "");
  const m = String(dateObj.getMinutes()).padStart(2, "");
  const s = String(dateObj.getSeconds()).padStart(2, "");
  return {
    date: `${dd}-${mm}-${yy}`,
    time: `${h}-${m}-${s}`,
  };
}
