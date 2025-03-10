import PropTypes from "prop-types";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Link } from "react-scroll";
import { useTranslation } from "react-i18next";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LangSwitcher from "./LangSwitcher";
import logo from "../assets/logo.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar(props) {
  const { t } = useTranslation();
  return (
    <>
      <Disclosure as="nav" className="bg-white border sticky top-0 z-50 ">
        {({ open }) => (
          <>
            <div className="global-margin px-2 sm:px-6 lg:px-8 border-b-2 border-b-dark-wood-800">
              <div className="relative flex h-16 justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-1 items-center justify-center  sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center pr-20">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src={logo}
                      alt="TreesAI logo"
                    />
                    <div className="flex items-baseline ">
                      <img
                        className="hidden h-6 w-auto lg:block pr-1"
                        src={logo}
                        alt="TreesAI logo"
                      />
                      <h3>.{t("nav_title")}</h3>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:space-x-8">
                    <span
                      className={classNames(
                        props.current === "home"
                          ? "border-green-600 text-green-600"
                          : "border-transparent text-gray-500",
                        "medium-intro-sm inline-flex items-center border-b-2 px-1 pt-1 cursor-pointer",
                      )}
                    >
                      <Link to="analysis" smooth={true} duration={500}>
                        {t("scenario_analysis")}
                      </Link>
                    </span>

                    <span
                      className={classNames(
                        props.current === "wirkung"
                          ? "border-green-600 text-green-600"
                          : "border-transparent text-gray-500",
                        "medium-intro-sm inline-flex items-center border-b-2 px-1 pt-1 cursor-pointer",
                      )}
                    >
                      <Link to="comp" smooth={true} duration={500}>
                        {t("scenario_comp")}
                      </Link>
                    </span>

                    <span className="inline-flex items-center border-b-2 px-1 pt-1">
                      <LangSwitcher />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-4">
                <DisclosureButton
                  as="a"
                  href="/"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  VORGEHENSWEISE
                </DisclosureButton>
                <DisclosureButton
                  as="a"
                  href="/methode"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  METHODE
                </DisclosureButton>
                <DisclosureButton
                  as="a"
                  href="/wirkungsmodellierung"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  WIRKUNGSMODELLIERUNG
                </DisclosureButton>
                <DisclosureButton
                  as="a"
                  href="/wiki"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  LBS WIKI
                </DisclosureButton>
                <DisclosureButton
                  as="a"
                  href="/info"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  INFO
                </DisclosureButton>
                <DisclosureButton
                  as="a"
                  href="/kontact"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  KONTAKT
                </DisclosureButton>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </>
  );
}

NavBar.propTypes = {
  current: PropTypes.string,
  loggedIn: PropTypes.bool,
};
