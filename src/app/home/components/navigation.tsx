import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "universal-cookie";


const Navigation = () => {

  const cookies = new Cookies();
  const [token, setToken] = useState(null);
  const router = useRouter();




  const handleDeleteCookie = () => {
    cookies.remove("gusvega_cookie");
    setToken(null);
    router.push("/");
  };

  const [isDashboardVisible, setDashboardVisibility] = useState(false);

  // Function to toggle the visibility of the "Dashboard" button
  const toggleDashboardVisibility = () => {
    setDashboardVisibility(!isDashboardVisible);
  };

    return (
        <nav className="bg-indigo-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center text-white">
              GUS
              <div className="hidden md:block ">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="/home"
                    className="bg-indigo-700 text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Dashboard
                  </a>
                </div>

              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {/* <!-- Profile dropdown --> */}
                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      className="relative flex max-w-xs items-center rounded-full bg-indigo-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                      id="user-menu-button"
                      aria-expanded="false"
                      onClick={handleDeleteCookie}
                      aria-haspopup="true"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">

              {/* <!-- Mobile menu button --> */}
              <button
                type="button"
                onClick={() => toggleDashboardVisibility()}
                className="relative inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        {isDashboardVisible && (

        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-1 pt-1 sm:px-3">
            {/* <!-- Current: "bg-indigo-700 text-white", Default: "text-white hover:bg-indigo-500 hover:bg-opacity-75" --> */}
            <a
              href="/home"
              className="bg-indigo-700 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Dashboard
            </a>
          </div>
          <div className="space-y-1 px-2 pb-2 pt-1 sm:px-3">
            {/* <!-- Current: "bg-indigo-700 text-white", Default: "text-white hover:bg-indigo-500 hover:bg-opacity-75" --> */}
            <a
              href="/"
              onClick={handleDeleteCookie}

              className="bg-indigo-700 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Sign Out
            </a>
          </div>
        </div>
        )}

      </nav>
    )
}

export default Navigation