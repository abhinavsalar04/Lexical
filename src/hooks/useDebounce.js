
import { useMemo, useRef } from 'react';

function debounce(func, delay, options = {}) {
    let timeoutId;
    let lastCallTime;
    const { maxWait } = options;
    let maxTimeoutId;
  
    function invokeFunction(context, args) {
      func.apply(context, args);
      lastCallTime = Date.now();
      timeoutId = null;
      maxTimeoutId = null;
    }
  
    function debounced(...args) {
      const now = Date.now();
      const isInvokingImmediately = !timeoutId;
      const context = this;
  
      clearTimeout(timeoutId);
  
      if (maxWait && !maxTimeoutId) {
        maxTimeoutId = setTimeout(() => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          invokeFunction(context, args);
        }, maxWait);
      }
  
      if (isInvokingImmediately && maxWait) {
        lastCallTime = now;
      }
  
      timeoutId = setTimeout(() => {
        if (!maxWait || now - lastCallTime >= maxWait) {
          invokeFunction(context, args);
        }
      }, delay);
    }
  
    debounced.cancel = function() {
      clearTimeout(timeoutId);
      clearTimeout(maxTimeoutId);
      timeoutId = null;
      maxTimeoutId = null;
    };
  
    return debounced;
  }

  
export function useDebounce(fn, ms, maxWait) {
  const funcRef = useRef(null);
  funcRef.current = fn;

  return useMemo(
    () =>
      debounce(
        (...args) => {
          if (funcRef.current) {
            funcRef.current(...args);
          }
        },
        ms,
        { maxWait }
      ),
    [ms, maxWait]
  );
}
