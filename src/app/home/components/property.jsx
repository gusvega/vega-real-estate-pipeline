import { useRouter } from "next/navigation";
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { useFirebase } from '../../../server/MyFirebaseContext'


import Link from 'next/link';

const Property = ({ analysis }) => {

  const router = useRouter();

  const { data, updateData } = useFirebase();

  const navigateToAnalysis = (id) => {
    router.push(`/analysis/${id}`);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const deleteAnalysis = (id) => {
    const updatedAnalyses = { ...data };
    delete data.analyses.properties[id]
    updateData({
      ...updatedAnalyses,
    });
    // console.log('+++++',analysis, data.analyses.properties[id])
  };


  return (
    <>
      <li key={analysis.id} className="relative py-5 hover:bg-gray-50 flex justify-between">
        <Link href={`/analysis/${analysis}`}>

          <div className="px-4 sm:px-6 lg:px-8" onClick={() => navigateToAnalysis(analysis.id)}>

            <div className="mx-auto flex max-w-4xl justify-between gap-x-6">
              <div className="flex min-w-0 gap-x-4">
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={analysis.imageUrl} alt="" />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <a href={analysis.href}>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      Address
                    </a>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <a href={`mailto:${analysis.email}`} className="relative truncate hover:underline">
                      {data.analyses.properties[analysis].values.property.address} {data.analyses.properties[analysis].values.property.city} , {data.analyses.properties[analysis].values.property.state}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <a href={analysis.href}>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      Investment
                    </a>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <a href={`mailto:${analysis.email}`} className="relative truncate hover:underline">
                      ${data.analyses.properties[analysis].calculations.totalInvestment}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <a href={analysis.href}>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      Gross Income
                    </a>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <a href={`mailto:${analysis.email}`} className="relative truncate hover:underline">
                      ${data.analyses.properties[analysis].calculations.grossIncomePerYear}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <a href={analysis.href}>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      Total Expenses
                    </a>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <a href={`mailto:${analysis.email}`} className="relative truncate hover:underline">
                      ${data.analyses.properties[analysis].calculations.totalExpensesPerYear}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <a href={analysis.href}>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      Op Expenses
                    </a>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <a href={`mailto:${analysis.email}`} className="relative truncate hover:underline">
                      ${data.analyses.properties[analysis].calculations.operatingExpensesPerYear}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <a href={analysis.href}>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      Net Op Income
                    </a>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <a href={`mailto:${analysis.email}`} className="relative truncate hover:underline">
                      ${data.analyses.properties[analysis].calculations.netOperatingIncome}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <a href={analysis.href}>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      Cash Flow
                    </a>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <a href={`mailto:${analysis.email}`} className="relative truncate hover:underline">
                      ${data.analyses.properties[analysis].calculations.cashFlowPerYear}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <a href={analysis.href}>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      ROI
                    </a>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <a href={`mailto:${analysis.email}`} className="relative truncate hover:underline">
                      {data.analyses.properties[analysis].calculations.cashOnCashReturn}%
                    </a>
                  </p>
                </div>
              </div>

            </div>

          </div>
        </Link>
        <Menu as="div" className="relative flex-none flex items-center justify-center mr-5">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => deleteAnalysis(analysis)}
                    className={classNames(
                      active ? 'bg-gray-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-gray-900'
                    )}
                  >
                    Delete
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </li>
    </>
  )
}

export default Property