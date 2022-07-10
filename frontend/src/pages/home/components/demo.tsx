import { Disclosure } from "@headlessui/react";
import { Fragment } from "react";

// export default function MyDisclosure() {
//   return (
//     <Disclosure>
//       {({ open }) => (
//         <>
//           <Disclosure.Button>Is team pricing available?</Disclosure.Button>

//           {open && (
//             <div>
//               {/*
//                 Using `static`, `Disclosure.Panel` is always rendered and
//                 ignores the `open` state.
//               */}
//               <Disclosure.Panel static>{/* ... */
// 							<h1>hell</h1>
// 							}</Disclosure.Panel>
//             </div>
//           )}
//         </>
//       )}
//     </Disclosure>
//   )
// }


function MyDisclosure() {
  return (
    /* Render a `div` for the root Disclosure component */
    <Disclosure as="div">
      {/* Render a `Fragment` for the Button component */}
      <Disclosure.Button as={Fragment}>
        <button>Solutions</button>
      </Disclosure.Button>

      {/* Render a `ul` for the Panel component */}
      <Disclosure.Panel as="ul">{/* ... */
			<h1>jflskdjf </h1>
			}</Disclosure.Panel>
    </Disclosure>
  )
}
