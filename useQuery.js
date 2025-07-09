import { useState, useRef, useEffect } from "react";

export default function useQuery(fn, deps = []) {
  const [state, setState] = useState({
    status: "loading",
    data: undefined,
    error: undefined,
  });

  const fetchIdRef = useRef(0);

  useEffect(() => {
    let isActive = true;
    const currentFetchId = ++fetchIdRef.current;

    setState({
      status: "loading",
      data: undefined,
      error: undefined,
    });

    fn()
      .then((val) => {
        if (!isActive || fetchIdRef.current !== currentFetchId) return;
        setState({ status: "success", data: val, error: undefined });
      })
      .catch((err) => {
        if (!isActive || fetchIdRef.current !== currentFetchId) return;
        setState({ status: "error", data: undefined, error: err });
      });

    return () => {
      isActive = false;
    };
  }, deps);

  return state;
}

/* 
------------------------------------------------------
📝 Notes:

The challenge here is that Promise resolutions are asynchronous from React updates. 
If the dependencies change before a pending Promise is resolved, race conditions can occur.

To avoid this:
- We use an `isActive` flag to ignore results if the component unmounts.
- We use a `fetchIdRef` (ref object) to track the most recent call.
  This ensures only the result of the most recent fetch updates the state.

Important:
- Always increment `fetchIdRef.current`, NOT `fetchIdRef` directly.
- `++x` → increments first, then returns the updated value.
- `x++` → returns the old value first, then increments.

This pattern is documented in React's official guide for safely using async functions inside `useEffect`.
*/
