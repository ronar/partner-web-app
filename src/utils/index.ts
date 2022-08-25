import { isPlainObject } from 'is-plain-object';

export const isMobile = (() => {
  if (typeof navigator === 'undefined' || typeof navigator.userAgent !== 'string') {
    return false;
  }
  return /Mobile/.test(navigator.userAgent);
})();

// Recursively removes any object keys with a value of undefined
export function removeUndefineds<T>(obj: T): T {
  if (!isPlainObject(obj)) return obj;

  const target: { [name: string]: any } = {};

  for (const key in obj) {
    const val = obj[key];
    if (typeof val !== 'undefined') {
      target[key] = removeUndefineds(val);
    }
  }

  return target as T;
}

export async function getDeviceInfo() {
  const devices = await navigator.mediaDevices.enumerateDevices();

  return {
    audioInputDevices: devices.filter(device => device.kind === 'audioinput'),
    videoInputDevices: devices.filter(device => device.kind === 'videoinput'),
    audioOutputDevices: devices.filter(device => device.kind === 'audiooutput'),
    hasAudioInputDevices: devices.some(device => device.kind === 'audioinput'),
    hasVideoInputDevices: devices.some(device => device.kind === 'videoinput'),
  };
}

export function getDocumentHeight() {
  var body = document.body,
    html = document.documentElement;

  var height = Math.max( body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight );

  return height;
}

export function getViewportHeight() {
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  return vh;
}


// This function will return 'true' when the specified permission has been denied by the user.
// If the API doesn't exist, or the query function returns an error, 'false' will be returned.
export async function isPermissionDenied(name: 'camera' | 'microphone') {
  const permissionName = name as PermissionName; // workaround for https://github.com/microsoft/TypeScript/issues/33923

  if (navigator.permissions) {
    try {
      const result = await navigator.permissions.query({ name: permissionName });
      return result.state === 'denied';
    } catch {
      return false;
    }
  } else {
    return false;
  }
}

// export const toQueryString = obj => {
export function toQueryString<T>(obj: T): string {
    var parts = [];

    return Object.entries(obj).reduce((acc, [key, val])=>{
        if (Array.isArray(val)) {
            val.forEach(e => acc += (acc ? '&': '') + key + '=' + e);
        } else {
            acc += (acc ? '&': '') + encodeURIComponent(key) + '=' + encodeURIComponent(val);
        }

        return acc;
    }, '');
};

// Copy to clipboard

export function copy(text: string): boolean {
    var selected: boolean | Range = false,
        selection,
        range,
        elem,
        success = false;

    try {
        selected = document!.getSelection()!.rangeCount > 0 // Check if there is any content selected previously
            ? document!.getSelection()!.getRangeAt(0) // Store selection if found
            : false;

        selection = window.getSelection();

        elem = document.createElement('textarea');
        elem.value = text;

        // For iOS
        elem.contentEditable = 'true';
        elem.setAttribute('readonly', '');

        // Place in top-left corner of screen regardless of scroll position
        elem.style.position = 'fixed';
        elem.style.top = '0';
        elem.style.left = '0';

        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        elem.style.width = '1px';
        elem.style.height = '1px';

        // We don't need padding, reducing the size if it does flash render.
        elem.style.padding = '0';

        // Clean up any borders.
        elem.style.border = 'none';
        elem.style.outline = 'none';
        elem.style.boxShadow = 'none';

        document.body.appendChild(elem);


        elem.select();

        elem.setSelectionRange(0, elem.value.length); // A big number, to cover anything that could be inside the element

        success = document.execCommand('copy');
    } finally {
        if (elem) {
            document.body.removeChild(elem);
        }

        if (selected) {                                   // If a selection existed before copying
            document!.getSelection()!.removeAllRanges();    // Unselect everything on the HTML document
            document!.getSelection()!.addRange(selected);   // Restore the original selection
        }
    }

    return success;
}

// module.exports = copy;

