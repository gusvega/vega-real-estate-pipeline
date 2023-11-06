'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'
import pmt from "formula-pmt";
import { v4 as uuidv4 } from "uuid";
import { useFirebase } from '../../../server/MyFirebaseContext'
import { CheckCircleIcon } from '@heroicons/react/20/solid';

import { firestoreDB, updateDoc, collection, setDoc, doc } from "../../../server/firebase";


const NewAnalysisModal = ({ isOpen, onClose, newData }) => {

    const cancelButtonRef = useRef(null)
    const [open, setOpen] = useState(isOpen)
    const [selectedStep, setSelectedStep] = useState('property');

    const [steps, setSteps] = useState({
        property: {
            id: '01', name: 'Property', href: '#', status: 'complete', values: {
                address: "3220 Bedford",
                city: "Amarillo",
                state: "TX",
                zipCode: "79103",
                bedrooms: "3",
                baths: "2",
                squareFeet: "1300",
                yearBuilt: "1965",
                otherInfo: "l",
            }
        },
        purchase: {
            id: '02', name: 'Purchase', href: '#', status: 'complete', values: {
                askingPrice: "500000",
                offerPrice: "500000",
                downPaymentPercent: "3",
                estimatedClosingCostPercentage: "3",
                renovationCosts: "00",
                setupCosts: "10000",
            }
        },
        income: {
            id: '03', name: 'Income', href: '#', status: 'complete', values: {
                averageNightlyRate: "400",
                averageOccupancyPercentage: "75",
            }
        },
        expenses: {
            id: '04', name: 'Expenses', href: '#', status: 'complete', values: {
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
            }
        },
    })

    const defaultObject = {
        property: {
            id: '01', name: 'Property', href: '#', status: 'current', values: {
                address: "",
                city: "",
                state: "",
                zipCode: "",
                bedrooms: "",
                baths: "",
                squareFeet: "",
                yearBuilt: "",
                otherInfo: "",
            }
        },
        purchase: {
            id: '02', name: 'Purchase', href: '#', status: 'upcoming', values: {
                askingPrice: "",
                offerPrice: "",
                downPaymentPercent: "",
                estimatedClosingCostPercentage: "",
                renovationCosts: "",
                setupCosts: "",
            }
        },
        income: {
            id: '03', name: 'Income', href: '#', status: 'upcoming', values: {
                averageNightlyRate: "",
                averageOccupancyPercentage: "",
            }
        },
        expenses: {
            id: '04', name: 'Expenses', href: '#', status: 'upcoming', values: {
                loanTermInYears: "",
                interestRatePercentage: "",
                estimatedPropertyTaxesPerMonth: "",
                estimatedInsuranceAmountPerMonth: "",
                privateMortgageInsuranceAmountPerMonth: "",
                monthlyHOAAmount: "",
                estimatedMonthlyUtilitiesAmount: "",
                cleaningFeeAmountPerMonth: "",
                internetBillPerMonth: "",
                maintenancePercentagePerMonth: "",
                managementFeePercentagePerMonth: "",
            }
        },
    }

    const { data, updateData, fetchDataFromFirebase } = useFirebase();

    const handleStepClick = (step) => {
        setSelectedStep(step)

        setSteps((prevSteps) => {
            const updatedSteps = {
                property: { ...prevSteps.property }, // Copy the property object
                purchase: { ...prevSteps.purchase }, // Copy the purchase object
                income: { ...prevSteps.income }, // Copy the income object
                expenses: { ...prevSteps.expenses }, // Copy the expenses object
            };

            for (const stepName in prevSteps) {
                if (stepName === step) {
                    const allValuesValid = Object.values(steps[stepName].values).every(
                        (value) => typeof value === 'string' && value.trim() !== ''
                    );

                    if (allValuesValid) {
                        updatedSteps[stepName] = {
                            ...prevSteps[stepName],
                            status: 'complete',
                        };
                    } else {
                        // Set the selected step to 'current'
                        updatedSteps[stepName] = {
                            ...prevSteps[stepName],
                            status: 'current',
                        };
                    }


                } else {
                    // Set all other steps to 'complete' or 'upcoming' based on your condition
                    // For example, setting all others to 'complete'

                    const allValuesValid = Object.values(steps[stepName].values).every(
                        (value) => typeof value === 'string' && value.trim() !== ''
                    );

                    if (allValuesValid) {
                        updatedSteps[stepName] = {
                            ...prevSteps[stepName],
                            status: 'complete',
                        };
                    } else {
                        updatedSteps[stepName] = {
                            ...prevSteps[stepName],
                            status: 'upcoming',
                        };
                    }


                }
            }

            return updatedSteps;
        });
    }

    interface Calculations {
        downPaymentAmount: any;
        estimatedClosingCostAmount: any;
        totalInvestment: any;

        grossIncomePerMonth: any;
        grossIncomePerYear: any;
        netOperatingIncome: any;
        capRatePercentage: any;
        cashFlowPerMonth: any;
        cashFlowPerYear: any;
        cashOnCashReturn: any;

        mortgageAmount: any;
        numberOfPayments: any;
        monthlyPrinciplePlusInterest: any;
        estimatedPropertyTaxesPerYear: any;
        estimatedInsuranceAmountPerYear: any;
        privateMortgageInsuranceAmountPerYear: any;
        airBNBFeePercentagePerMonth: any;
        airBNBFeePercentagePerYear: any;
        maintenanceAmountPerMonth: any;
        managementFeeAmountPerMonth: any;

        operatingExpensesPerMonth: any;
        operatingExpensesPerYear: any;
        totalExpensesPerMonth: any;
        totalExpensesPerYear: any;
    }

    const doCalcs = (values: {
        property?: {
            address: string;
            city: string;
            state: string;
            zipCode: string;
            bedrooms: string;
            baths: string;
            squareFeet: string;
            yearBuilt: string;
            otherInfo: string;
        };
        purchase: any;
        income: any;
        expenses: any;
    }) => {
        let calculations: Calculations = {
            // Initialization of properties
            downPaymentAmount: 0,
            estimatedClosingCostAmount: 0,
            totalInvestment: 0,
            grossIncomePerMonth: 0,
            grossIncomePerYear: 0,
            netOperatingIncome: 0,
            capRatePercentage: 0,
            cashFlowPerMonth: 0,
            cashFlowPerYear: 0,
            cashOnCashReturn: 0,
            mortgageAmount: 0,
            numberOfPayments: 0,
            monthlyPrinciplePlusInterest: 0,
            estimatedPropertyTaxesPerYear: 0,
            estimatedInsuranceAmountPerYear: 0,
            privateMortgageInsuranceAmountPerYear: 0,
            airBNBFeePercentagePerMonth: 0,
            airBNBFeePercentagePerYear: 0,
            maintenanceAmountPerMonth: 0,
            managementFeeAmountPerMonth: 0,
            operatingExpensesPerMonth: 0,
            operatingExpensesPerYear: 0,
            totalExpensesPerMonth: 0,
            totalExpensesPerYear: 0,
        };

        calculations.downPaymentAmount =
            parseFloat(values.purchase.offerPrice) *
            (parseFloat(values.purchase.downPaymentPercent) / 100);
        calculations.estimatedClosingCostAmount =
            parseFloat(values.purchase.offerPrice) *
            (parseFloat(values.purchase.estimatedClosingCostPercentage) / 100);
        calculations.totalInvestment =
            parseFloat(values.purchase.setupCosts) +
            parseFloat(values.purchase.renovationCosts) +
            calculations.estimatedClosingCostAmount +
            calculations.downPaymentAmount;

        // expenses calculations
        calculations.mortgageAmount =
            parseFloat(values.purchase.offerPrice) - calculations.downPaymentAmount;
        calculations.numberOfPayments =
            parseFloat(values.expenses.loanTermInYears) * 12;
        calculations.monthlyPrinciplePlusInterest =
            pmt(
                parseFloat(values.expenses.interestRatePercentage) / 100 / 12,
                calculations.numberOfPayments,
                calculations.mortgageAmount
            ) * -1;
        calculations.estimatedPropertyTaxesPerYear =
            parseFloat(values.expenses.estimatedPropertyTaxesPerMonth) * 12;
        calculations.estimatedInsuranceAmountPerYear =
            parseFloat(values.expenses.estimatedInsuranceAmountPerMonth) * 12;
        calculations.privateMortgageInsuranceAmountPerYear =
            parseFloat(values.expenses.privateMortgageInsuranceAmountPerMonth) * 12;

        calculations.grossIncomePerMonth =
            ((parseFloat(values.income.averageNightlyRate) * 365) / 12) *
            (parseFloat(values.income.averageOccupancyPercentage) / 100) +
            parseFloat(values.expenses.cleaningFeeAmountPerMonth);

        calculations.airBNBFeePercentagePerMonth =
            calculations.grossIncomePerMonth * 0.03;
        calculations.airBNBFeePercentagePerYear =
            calculations.airBNBFeePercentagePerMonth * 12;
        calculations.maintenanceAmountPerMonth =
            ((parseFloat(values.income.averageNightlyRate) * 365) / 12) *
            (parseFloat(values.income.averageOccupancyPercentage) / 100) *
            (parseFloat(values.expenses.maintenancePercentagePerMonth) / 100);
        calculations.managementFeeAmountPerMonth =
            ((parseFloat(values.income.averageNightlyRate) * 365) / 12) *
            (parseFloat(values.income.averageOccupancyPercentage) / 100) *
            (parseFloat(values.expenses.managementFeePercentagePerMonth) / 100);

        calculations.operatingExpensesPerMonth =
            parseFloat(values.expenses.estimatedPropertyTaxesPerMonth) + //150
            parseFloat(values.expenses.estimatedInsuranceAmountPerMonth) + //145
            parseFloat(values.expenses.privateMortgageInsuranceAmountPerMonth) + //86
            parseFloat(values.expenses.monthlyHOAAmount) + //0
            parseFloat(values.expenses.estimatedMonthlyUtilitiesAmount) + //300
            calculations.airBNBFeePercentagePerMonth + //288.75
            parseFloat(values.expenses.cleaningFeeAmountPerMonth) + //500
            calculations.maintenanceAmountPerMonth + //456.25
            parseFloat(values.expenses.internetBillPerMonth) + //100
            calculations.managementFeeAmountPerMonth; // 365

        calculations.operatingExpensesPerYear =
            calculations.operatingExpensesPerMonth * 12;

        calculations.totalExpensesPerMonth =
            calculations.operatingExpensesPerMonth +
            calculations.monthlyPrinciplePlusInterest;

        calculations.totalExpensesPerYear = (calculations.totalExpensesPerMonth * 12).toFixed(2);

        // income calculations
        calculations.grossIncomePerYear = calculations.grossIncomePerMonth * 12;
        calculations.netOperatingIncome =
            calculations.grossIncomePerYear - calculations.operatingExpensesPerYear;
        calculations.capRatePercentage =
            (calculations.netOperatingIncome / parseFloat(values.purchase.offerPrice)) *
            100;
        calculations.cashFlowPerMonth =
            calculations.grossIncomePerMonth - calculations.totalExpensesPerMonth;
        calculations.cashFlowPerYear = (calculations.cashFlowPerMonth * 12).toFixed(2);
        calculations.cashOnCashReturn = Math.ceil(
            (parseFloat(calculations.cashFlowPerYear) / calculations.totalInvestment) * 100
        );

        console.log(calculations);
        return calculations;
    };

    const onAnalyzeClick = () => {

        // Perform calculations using doCalcs with state.amarillo.values
        const analysisResults = doCalcs(newData);

        // Create a new analysis object
        const newAnalysis = {
            id: 2,
            values: newData,
            calculations: analysisResults,
        };

        const newId = uuidv4();

        // addNewPropertyToFirebase(newId, newAnalysis)
        updateData({
            ...data,

            analyses: {
                ...data.analyses,
                properties: {
                    ...data.analyses.properties,
                    [newId]: newAnalysis
                }
            },
        });
        

        console.log("Analysis complete...", newAnalysis);
        console.log("ContextState: --- ", data);

        setOpen(onClose);

        setSteps(defaultObject)
        setSelectedStep('property')

    };

    const addNewPropertyToFirebase = (newId, newAnalysis) => {
        // Fetch the user's document
        const userDocumentRef = doc(firestoreDB, "users", data.UID);

        // Update the "analyses" object with the new property
        updateDoc(userDocumentRef, {
            [`analyses.properties.${newId}`]: newAnalysis,
        })
            .then(() => {
                console.log("Property added to Firestore successfully.");
                fetchDataFromFirebase()
            })
            .catch((error) => {
                console.error("Error adding property to Firestore:", error);
            });


        console.log("Property added to Firestore successfully.");


    }

    const handleInputChange = (stepName, name, value) => {
        const allValuesValid = Object.values(steps[stepName].values).every(
            (value) => typeof value === 'string' && value.trim() !== ''
        );

        setSteps((prevSteps) => {
            const updatedStep = {
                ...prevSteps[stepName],
                values: {
                    ...prevSteps[stepName].values,
                    [name]: value,
                },
            };

            return {
                ...prevSteps,
                [stepName]: updatedStep,
            };
        });



        if (allValuesValid) {
            // If all values are valid, update the status to 'complete'
            setSteps((prevSteps) => {
                const updatedStep = {
                    ...prevSteps[stepName],
                    status: 'complete'
                };

                return {
                    ...prevSteps,
                    [stepName]: updatedStep,
                };
            });

        } else {
            console.log('Some values are empty');
        }

    };

    return (

        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-[90%] sm:max-w-[800px] sm:p-6">
                                <div className="hidden sm:block">
                                    <div>
                                        <div className='mb-4'>New Analysis</div>

                                        <div className="border-b border-gray-900/10 pb-12">
                                            <nav aria-label="Progress">
                                                <ol role="list" className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
                                                    {Object.values(steps).map((step, stepIdx) => (
                                                        <li key={step.name} className="relative md:flex md:flex-1" onClick={() => handleStepClick(step.name.toLowerCase())}>
                                                            {step.status === 'complete' ? (
                                                                <a href={step.href} className="group flex w-full items-center ">

                                                                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                                                                        {Object.values(step.values).every((value) => typeof value === 'string') ? (
                                                                            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                                                                                <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                                            </span>
                                                                        ) : null}
                                                                        <span className={`ml-4 text-sm font-medium ${selectedStep === step.name.toLowerCase() ? 'font-semibold' : 'text-blue-900'}`}>{step.name}</span>
                                                                    </span>
                                                                </a>
                                                            ) : step.status === 'current' ? (
                                                                <a href={step.href} className="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
                                                                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                                                                        <span className="text-indigo-600">{step.id}</span>
                                                                    </span>
                                                                    <span className={`ml-4 text-sm font-medium ${selectedStep === step.name.toLowerCase() ? 'font-semibold' : 'text-blue-900'}`}>{step.name}</span>
                                                                </a>
                                                            ) : (
                                                                <a href={step.href} className="group flex items-center">
                                                                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                                                                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                                                                            <span className="text-gray-500 group-hover:text-gray-900">{step.id}</span>
                                                                        </span>
                                                                        <span className={`ml-4 text-sm font-medium ${selectedStep === step.name.toLowerCase() ? 'font-semibold' : 'text-blue-900'}`}>{step.name}</span>
                                                                    </span>
                                                                </a>
                                                            )}

                                                            {stepIdx !== Object.keys(steps).length - 1 ? (
                                                                <>
                                                                    {/* Arrow separator for lg screens and up */}
                                                                    <div className="absolute right-0 top-0 hidden h-full w-5 md:block" aria-hidden="true">
                                                                        <svg
                                                                            className="h-full w-full text-gray-300"
                                                                            viewBox="0 0 22 80"
                                                                            fill="none"
                                                                            preserveAspectRatio="none"
                                                                        >
                                                                            <path
                                                                                d="M0 -2L20 40L0 82"
                                                                                vectorEffect="non-scaling-stroke"
                                                                                stroke="currentcolor"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                </>
                                                            ) : null}
                                                        </li>
                                                    ))}

                                                </ol>
                                            </nav>
                                            <div className="flex flex-wrap">

                                                {Object.entries(steps[selectedStep].values).map(([key, value]) => (
                                                    <div key={key} className="sm:col-span-2 sm:col-start-1 mr-12 mt-10">
                                                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                            {key.split(/(?=[A-Z])/)
                                                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                                .join(' ')}
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="city"
                                                                id="city"
                                                                autoComplete="address-level2"
                                                                className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                onChange={(e) => handleInputChange(selectedStep, key, e.target.value)}
                                                                value={value as string}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="button"
                                            className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                                                // Use a conditional class to disable the button based on the statuses
                                                Object.values(steps).every((step) => step.status === 'complete')
                                                    ? 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                                    : 'bg-gray-400 cursor-not-allowed'
                                                } sm:col-start-2`}
                                            onClick={() => {
                                                if (Object.values(steps).every((step) => step.status === 'complete')) {
                                                    // Only execute the action if all steps are 'complete'
                                                    onAnalyzeClick();
                                                }
                                            }}
                                            disabled={!Object.values(steps).every((step) => step.status === 'complete')}
                                        >
                                            Analyze
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                            onClick={onClose}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>

                                <div className="block sm:hidden">
                                    <div>
                                        <div className='mb-2'>New Analysis</div>

                                        <div className="border-b border-gray-900/10 pb-12">
                                            <div className="px-4 py-6 sm:px-6 lg:px-8">
                                                <nav className="flex justify-center" aria-label="Progress">
                                                    <ol role="list" className="flex space-x-8">
                                                        {Object.values(steps).map((step) => (
                                                            <li key={step.name} onClick={() => handleStepClick(step.name.toLowerCase())}>
                                                                {step.status === 'complete' ? (
                                                                    <a href={step.href} className="group flex flex-col items-center">
                                                                        <span className="relative flex h-5 w-5 items-center justify-center">
                                                                            <CheckCircleIcon
                                                                                className="h-full w-full text-indigo-600 group-hover:text-indigo-800"
                                                                                aria-hidden="true"
                                                                            />
                                                                        </span>
                                                                        <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900 mt-1">
                                                                            {step.name}
                                                                        </span>
                                                                    </a>
                                                                ) : step.status === 'current' ? (
                                                                    <a href={step.href} className="flex flex-col items-center" aria-current="step">
                                                                        <span className="relative flex h-5 w-5 items-center justify-center">
                                                                            <span className="absolute h-4 w-4 rounded-full bg-indigo-200" />
                                                                            <span className="relative block h-2 w-2 rounded-full bg-indigo-600" />
                                                                        </span>
                                                                        <span className="text-sm font-medium text-indigo-600 mt-1">{step.name}</span>
                                                                    </a>
                                                                ) : (
                                                                    <a href={step.href} className="group flex flex-col items-center">
                                                                        <div className="relative flex h-5 w-5 items-center justify-center">
                                                                            <div className="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-gray-400" />
                                                                        </div>
                                                                        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-900 mt-1">{step.name}</p>
                                                                    </a>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </nav>
                                            </div>



                                            <div className="flex flex-col"> {/* Flex container for all label-input pairs */}
                                                {Object.entries(steps[selectedStep].values).map(([key, value]) => (
                                                    <div key={key} className="flex justify-between mr-12 mt-2 items-center">
                                                        <label htmlFor="city" className="block text-xs font-medium leading-6 text-gray-900">
                                                            {key
                                                                .split(/(?=[A-Z])/)
                                                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                                .join(' ')}
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="city"
                                                                id="city"
                                                                autoComplete="address-level2"
                                                                className="block text-xs pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                onChange={(e) => handleInputChange(selectedStep, key, e.target.value)}
                                                                value={value as string}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="button"
                                            className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                                                // Use a conditional class to disable the button based on the statuses
                                                Object.values(steps).every((step) => step.status === 'complete')
                                                    ? 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                                    : 'bg-gray-400 cursor-not-allowed'
                                                } sm:col-start-2`}
                                            onClick={() => {
                                                if (Object.values(steps).every((step) => step.status === 'complete')) {
                                                    // Only execute the action if all steps are 'complete'
                                                    onAnalyzeClick();
                                                }
                                            }}
                                            disabled={!Object.values(steps).every((step) => step.status === 'complete')}
                                        >
                                            Analyze
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                            onClick={onClose}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>


        </Transition.Root>
    )
}

export default NewAnalysisModal