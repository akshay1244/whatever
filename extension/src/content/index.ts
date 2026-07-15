import { ObserverEngine } from './observer';
import { syncStoreWithStorage } from '../storage/store';
// import { getAdapterForHostname } from '../adapters/registry';

syncStoreWithStorage();

let currentEngine: ObserverEngine | null = null;

function initialize() {
  if (currentEngine) {
    currentEngine.stop();
  }
  
  // const adapter = getAdapterForHostname(window.location.hostname);
  // if (!adapter) return;
  // adapter.initialize();
  // currentEngine = new ObserverEngine(adapter);
  // currentEngine.start();
  // 
  // const navEvent = adapter.getNavigationEvent();
  // if (navEvent) {
  //   document.addEventListener(navEvent, initialize);
  // }
}

initialize();

