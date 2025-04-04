import i18next from "i18next";
import { useState, useEffect } from "react";

const options = [
  { id: 0, name: "de" },
  { id: 1, name: "en" },
];

export default function LangSelector() {
  const [selectedLang, setSelectedLang] = useState("de");

  // Read language from URL on component mount
  useEffect(() => {
    const url = new URL(window.location.href);
    const langParam = url.searchParams.get("lang");

    // If a valid language is in the URL, set it
    if (langParam && options.some((option) => option.name === langParam)) {
      setSelectedLang(langParam);
      i18next.changeLanguage(langParam);
    }
  }, []);

  const setLang = (value) => {
    setSelectedLang(value);

    // Update URL with the new language parameter
    const url = new URL(window.location.href);
    url.searchParams.set("lang", value);

    // Update browser history without page reload
    window.history.pushState({}, "", url.toString());

    // Change i18next language
    i18next.changeLanguage(value, (err, t) => {
      if (err) return console.log("something went wrong loading", err);
      t("key"); // -> same as i18next.t
    });
  };

  return (
    <div className="">
      <select
        id="lang"
        onChange={(e) => setLang(e.target.value)}
        name="lang"
        className="bold-intro-sm rounded-md border-0 py-1.5 pl-3 pr-2 text-gray-900 uppercase"
        value={selectedLang} // Changed from defaultValue to value for controlled component
      >
        {options.map((o) => (
          <option key={o.id} value={o.name}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
}
