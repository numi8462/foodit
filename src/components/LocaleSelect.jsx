import { useLocale, useSetLocale } from "../contexts/LocaleContext";

function LocaleSelect() {
  // hooks need to be at top level
  const locale = useLocale();
  const setLocale = useSetLocale();

  const handleChange = (e) => setLocale(e.target.value);

  return (
    <select name="" id="" value={locale} onChange={handleChange}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  );
}

export default LocaleSelect;
