"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

import { firestoreDB, collection, setDoc, addDoc, doc, auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword } from "../server/firebase";

import { useFirebase } from '../server/MyFirebaseContext'

interface AuthInfo {
  isloggedIn: boolean;
}

export default function Home() {
  const router = useRouter();

  const { data, setData, fetchDataFromFirebase } = useFirebase()

  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    isloggedIn: false,
  });

  const [current, setCurrent] = useState<boolean>(true);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // On component mount, check for the cookie
    checkCookie();
    // console.log('State: ', state)

  }, []);

  const checkCookie = () => {
    const userCookie = Cookies.get("gusvega_cookie");
    if (userCookie) {
      const token = userCookie;
      const decodedToken = jwt.decode(token);
      router.push("/home");
    } else {
      console.log("Cookie not found");
    }
  };

  const handleSignUpCookie = (token: string) => {
    const decodedToken = jwt.decode(token) as jwt.JwtPayload;
    Cookies.set("gusvega_cookie", token, {
      expires: new Date(decodedToken.exp! * 1000),
    });
  };

  const addDocument = async (token: string) => {
    const decodedToken = jwt.decode(token) as jwt.JwtPayload;
    const usersCollectionRef = collection(firestoreDB, "users");
    try {
      const documentRef = doc(usersCollectionRef, decodedToken.user_id);
      console.log('docRed', documentRef, decodedToken.user_id)
      await setDoc(documentRef, {
        firstName: name,
        lastName: "",
        email: email,
        UID: decodedToken.user_id,
        admin: false,
        analyses: {
          properties: {
            '000': {
              id: '1',
              values: {
                property: {
                  address: "3220 Bedford",
                  city: "Amarillo",
                  state: "TX",
                  zipCode: "79103",
                  bedrooms: "3",
                  baths: "2",
                  squareFeet: "1300",
                  yearBuilt: "1965",
                  otherInfo: "good conditions",
                },
                purchase: {
                  askingPrice: "500000",
                  offerPrice: "500000",
                  downPaymentPercent: "3",
                  estimatedClosingCostPercentage: "3",
                  renovationCosts: "0",
                  setupCosts: "10000",
                },
                income: {
                  averageNightlyRate: "400",
                  averageOccupancyPercentage: "75",
                },
                expenses: {
                  loanTermInYears: "30",
                  interestRatePercentage: "6",
                  estimatedPropertyTaxesPerMonth: "150",
                  estimatedInsuranceAmountPerMonth: "145",
                  privateMortgageInsuranceAmountPerMonth: "86",
                  monthlyHOAAmount: "0",
                  estimatedMonthlyUtilitiesAmount: "300",
                  cleaningFeeAmountPerMonth: "500",
                  internetBillPerMonth: "100",
                  maintenancePercentagePerMonth: "5",
                  managementFeePercentagePerMonth: "0",
                },
              },
              calculations: {
                downPaymentAmount: "",
                estimatedClosingCostAmount: "",
                totalInvestment: 20000,
                grossIncomePerMonth: "",
                grossIncomePerYear: 333,
                netOperatingIncome: 555,
                capRatePercentage: "",
                cashFlowPerMonth: "",
                cashFlowPerYear: 9999,
                cashOnCashReturn: 13,
                mortgageAmount: "",
                numberOfPayments: "",
                monthlyPrinciplePlusInterest: "",
                estimatedPropertyTaxesPerYear: "",
                estimatedInsuranceAmountPerYear: "",
                privateMortgageInsuranceAmountPerYear: "",
                airBNBFeePercentagePerMonth: "",
                airBNBFeePercentagePerYear: "",
                maintenanceAmountPerMonth: "",
                managementFeeAmountPerMonth: "",
                operatingExpensesPerMonth: "",
                operatingExpensesPerYear: "",
                totalExpensesPerMonth: "",
                totalExpensesPerYear: 444
              },
            }
          },
          neighborhoods: {
            'belmar': {
              properties: {
                '002': {
                  id: '1',
                  values: {
                    property: {
                      address: "3220 Bedford",
                      city: "Amarillo",
                      state: "TX",
                      zipCode: "79103",
                      bedrooms: "3",
                      baths: "2",
                      squareFeet: "1300",
                      yearBuilt: "1965",
                      otherInfo: "good conditions",
                    },
                    purchase: {
                      askingPrice: "500000",
                      offerPrice: "500000",
                      downPaymentPercent: "3",
                      estimatedClosingCostPercentage: "3",
                      renovationCosts: "0",
                      setupCosts: "10000",
                    },
                    income: {
                      averageNightlyRate: "400",
                      averageOccupancyPercentage: "75",
                    },
                    expenses: {
                      loanTermInYears: "30",
                      interestRatePercentage: "6",
                      estimatedPropertyTaxesPerMonth: "150",
                      estimatedInsuranceAmountPerMonth: "145",
                      privateMortgageInsuranceAmountPerMonth: "86",
                      monthlyHOAAmount: "0",
                      estimatedMonthlyUtilitiesAmount: "300",
                      cleaningFeeAmountPerMonth: "500",
                      internetBillPerMonth: "100",
                      maintenancePercentagePerMonth: "5",
                      managementFeePercentagePerMonth: "0",
                    },
                  },
                  calculations: {
                    downPaymentAmount: "",
                    estimatedClosingCostAmount: "",
                    totalInvestment: 20000,
                    grossIncomePerMonth: "",
                    grossIncomePerYear: 333,
                    netOperatingIncome: 555,
                    capRatePercentage: "",
                    cashFlowPerMonth: "",
                    cashFlowPerYear: 9999,
                    cashOnCashReturn: 13,
                    mortgageAmount: "",
                    numberOfPayments: "",
                    monthlyPrinciplePlusInterest: "",
                    estimatedPropertyTaxesPerYear: "",
                    estimatedInsuranceAmountPerYear: "",
                    privateMortgageInsuranceAmountPerYear: "",
                    airBNBFeePercentagePerMonth: "",
                    airBNBFeePercentagePerYear: "",
                    maintenanceAmountPerMonth: "",
                    managementFeeAmountPerMonth: "",
                    operatingExpensesPerMonth: "",
                    operatingExpensesPerYear: "",
                    totalExpensesPerMonth: "",
                    totalExpensesPerYear: 444
                  },
                }
              }
            }
          },
          zipCodes: {
            'zipCode1': {
              properties: {
                '003': {
                  id: '1',
                  values: {
                    property: {
                      address: "3220 Bedford",
                      city: "Amarillo",
                      state: "TX",
                      zipCode: "79103",
                      bedrooms: "3",
                      baths: "2",
                      squareFeet: "1300",
                      yearBuilt: "1965",
                      otherInfo: "good conditions",
                    },
                    purchase: {
                      askingPrice: "500000",
                      offerPrice: "500000",
                      downPaymentPercent: "3",
                      estimatedClosingCostPercentage: "3",
                      renovationCosts: "0",
                      setupCosts: "10000",
                    },
                    income: {
                      averageNightlyRate: "400",
                      averageOccupancyPercentage: "75",
                    },
                    expenses: {
                      loanTermInYears: "30",
                      interestRatePercentage: "6",
                      estimatedPropertyTaxesPerMonth: "150",
                      estimatedInsuranceAmountPerMonth: "145",
                      privateMortgageInsuranceAmountPerMonth: "86",
                      monthlyHOAAmount: "0",
                      estimatedMonthlyUtilitiesAmount: "300",
                      cleaningFeeAmountPerMonth: "500",
                      internetBillPerMonth: "100",
                      maintenancePercentagePerMonth: "5",
                      managementFeePercentagePerMonth: "0",
                    },
                  },
                  calculations: {
                    downPaymentAmount: "",
                    estimatedClosingCostAmount: "",
                    totalInvestment: 20000,
                    grossIncomePerMonth: "",
                    grossIncomePerYear: 333,
                    netOperatingIncome: 555,
                    capRatePercentage: "",
                    cashFlowPerMonth: "",
                    cashFlowPerYear: 9999,
                    cashOnCashReturn: 13,
                    mortgageAmount: "",
                    numberOfPayments: "",
                    monthlyPrinciplePlusInterest: "",
                    estimatedPropertyTaxesPerYear: "",
                    estimatedInsuranceAmountPerYear: "",
                    privateMortgageInsuranceAmountPerYear: "",
                    airBNBFeePercentagePerMonth: "",
                    airBNBFeePercentagePerYear: "",
                    maintenanceAmountPerMonth: "",
                    managementFeeAmountPerMonth: "",
                    operatingExpensesPerMonth: "",
                    operatingExpensesPerYear: "",
                    totalExpensesPerMonth: "",
                    totalExpensesPerYear: 444
                  },
                }
              }

            }
          },
          cities: {
            'city1': {
              properties: {
                '004': {
                  id: '1',
                  values: {
                    property: {
                      address: "3220 Bedford",
                      city: "Amarillo",
                      state: "TX",
                      zipCode: "79103",
                      bedrooms: "3",
                      baths: "2",
                      squareFeet: "1300",
                      yearBuilt: "1965",
                      otherInfo: "good conditions",
                    },
                    purchase: {
                      askingPrice: "500000",
                      offerPrice: "500000",
                      downPaymentPercent: "3",
                      estimatedClosingCostPercentage: "3",
                      renovationCosts: "0",
                      setupCosts: "10000",
                    },
                    income: {
                      averageNightlyRate: "400",
                      averageOccupancyPercentage: "75",
                    },
                    expenses: {
                      loanTermInYears: "30",
                      interestRatePercentage: "6",
                      estimatedPropertyTaxesPerMonth: "150",
                      estimatedInsuranceAmountPerMonth: "145",
                      privateMortgageInsuranceAmountPerMonth: "86",
                      monthlyHOAAmount: "0",
                      estimatedMonthlyUtilitiesAmount: "300",
                      cleaningFeeAmountPerMonth: "500",
                      internetBillPerMonth: "100",
                      maintenancePercentagePerMonth: "5",
                      managementFeePercentagePerMonth: "0",
                    },
                  },
                  calculations: {
                    downPaymentAmount: "",
                    estimatedClosingCostAmount: "",
                    totalInvestment: 20000,
                    grossIncomePerMonth: "",
                    grossIncomePerYear: 333,
                    netOperatingIncome: 555,
                    capRatePercentage: "",
                    cashFlowPerMonth: "",
                    cashFlowPerYear: 9999,
                    cashOnCashReturn: 13,
                    mortgageAmount: "",
                    numberOfPayments: "",
                    monthlyPrinciplePlusInterest: "",
                    estimatedPropertyTaxesPerYear: "",
                    estimatedInsuranceAmountPerYear: "",
                    privateMortgageInsuranceAmountPerYear: "",
                    airBNBFeePercentagePerMonth: "",
                    airBNBFeePercentagePerYear: "",
                    maintenanceAmountPerMonth: "",
                    managementFeeAmountPerMonth: "",
                    operatingExpensesPerMonth: "",
                    operatingExpensesPerYear: "",
                    totalExpensesPerMonth: "",
                    totalExpensesPerYear: 444
                  },
                }
              }
            },
          },
        },
      });

    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userRes = userCredential.user;

      // You can handle any additional logic here (e.g., updating user profile)
      userRes.getIdToken().then((token) => {
        handleSignUpCookie(token);
        addDocument(token);
        fetchDataFromFirebase()

      });

      console.log('userRes', userRes)

      router.push("/home");

      console.log("Registration successful:", userRes);
      return userRes; // Optionally return the user object
    } catch (error) {
      console.error("Error during registration:", error);
      throw error; // Optionally rethrow the error for further handling
    }
  };

  const handleSignIn = async () => {
    // e.preventDefault();
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length === 0) {
        console.log("Account does not exist. Please sign up first.");
      } else {
        await signInWithEmailAndPassword(auth, email, password)
          .then((res) => {
            const userRes = res.user;
            userRes.getIdToken().then((token) => {
              handleSignUpCookie(token);
              console.log("Sign-in successful!");
              fetchDataFromFirebase()
              router.push("/home");
            });
          })
          .catch((err) => {
            if (err.code === "auth/email-already-in-use") {
              setError("Email already in use");
            }
          });

      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleClick = (currentBtn: boolean) => {
    if (currentBtn !== current) {
      setCurrent(currentBtn);
    }
  };

  return (
    <>
      <div className="text-white">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-black">
              Welcome to my Real Estate Analysis Tool!
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex mb-6">
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md ${current == false ? "bg-gray-300" : "bg-indigo-600"
                  } m-1 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                onClick={() => handleClick(true)}
              >
                Sign In
              </button>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md ${current ? "bg-gray-300" : "bg-indigo-600"
                  } m-1 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                onClick={() => handleClick(false)}
              >
                Sign Up
              </button>
            </div>

            <form className="space-y-6" action="#" method="POST">
              {authInfo.isloggedIn ? (
                <>dd</>
              ) : current == true ? (
                <>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-black block text-sm font-medium leading-6 "
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-black block text-sm font-medium leading-6 "
                      >
                        Password
                      </label>
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-black">
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-black"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-black"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full rounded-md border-1 border-black py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </>
              )}
            </form>

            {current ? (
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md bg-indigo-600 mt-10 p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                onClick={handleSignIn}
              >
                Submit
              </button>
            ) : (
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md bg-indigo-600 mt-10 p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                onClick={register}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
