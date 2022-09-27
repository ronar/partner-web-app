import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BookingOptions, Booking } from '../../types';
import { toQueryString } from '../../utils';
import { __API__ } from '../../constants';

// const endpoint = ; // process.env.REACT_APP_TOKEN_ENDPOINT || '/token';

export function getAuthToken() {
  const match = window.location.search.match(/auth_token=(.*)&?/);
  const token = match ? match[1] : window.sessionStorage.getItem('auth_token');
  return token;
}

export function getUserId() {
  const match = window.location.search.match(/userId=(.*)&?/);
  const token = match ? match[1] : window.sessionStorage.getItem('userId');
  return token;
}

export function getEmail() {
  const match = window.location.search.match(/email=(.*)&?/);
  const token = match ? match[1] : window.sessionStorage.getItem('email');
  return token;
}

export function getPassword() {
  const match = window.location.search.match(/password=(.*)&?/);
  const token = match ? match[1] : window.sessionStorage.getItem('password');
  return token;
}

export function authenticate(
  email: string,
  password: string,
) {
  return fetch(`${__API__}/partners/auth`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',

    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export function fetchUser(
  authToken: string,
  userId: string
) {
  return fetch(`${__API__}/partners/${userId}`, {
    // method: 'POST',
    headers: {
      'content-type': 'application/json',
      'auth_token': authToken,
    },
    // body: JSON.stringify({
      // email,
      // password,
    // }),
  });
}

function fetchBooking(
  userId: string,
  bookingId: number,
  authToken: string,
  isPartner: boolean = true
) {
  const endpointUrl = `${__API__}/${isPartner ? 'partners' : 'users'}/${userId}/bookings/${bookingId}`; // process.env.REACT_APP_TOKEN_ENDPOINT || '/token';

  return fetch(endpointUrl, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'auth_token': authToken,
    },
    // body: JSON.stringify({
    //   email,
    //   password,
    // }),
  });
}

function fetchBookings(
  userId: string,
  bookingId: number,
  authToken: string,
  isPartner: boolean = true
) {
  const endpointUrl = `${__API__}/${isPartner ? 'partners' : 'users'}/${userId}/bookings`; // process.env.REACT_APP_TOKEN_ENDPOINT || '/token';

  return fetch(endpointUrl, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'auth_token': authToken,
    },
    // body: JSON.stringify({
    //   email,
    //   password,
    // }),
  });
}

// getBooking: async (userId: string, bookingId: string, isPartner?: boolean) => {
//         const endpoint = `${__API__}/users/${userId}/bookings/${bookingId}`; // process.env.REACT_APP_TOKEN_ENDPOINT || '/token';

//         return fetch(endpoint, {
//           method: 'GET',
//           headers: {
//             'content-type': 'application/json',
//             'auth_token': authToken,
//           },
//           // body: JSON.stringify({
//           //   user_identity,
//           //   room_name,
//           //   create_conversation: process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true',
//           // }),
//         }).then(res => res.json());
//       },

export function verifyToken(authToken: string, userId: string) {
  return fetchUser(authToken, userId).then(
    async res => {
      const jsonResponse = await res.json();
      if (res.status === 401) {
        return { isValid: false, error: jsonResponse.message };
      }

      // if (res.status === 422) {
      //   return { isValid: false, error: 'Incorrect email or password.' };
      // }

      if (jsonResponse.message) {
        return { isValid: false, error: jsonResponse.message };
      }

      if (res.ok && jsonResponse.authToken) {
        return {
          isValid: true,
          id: jsonResponse.id,
          fullName: `${jsonResponse.firstName} ${jsonResponse.familyName}`,
          firstName: jsonResponse.firstName,
          familyName: jsonResponse.familyName,
          authToken: jsonResponse.authToken.id,
          profilePicture: jsonResponse.userDetail.pictureUrl,
          numberOfSessions: jsonResponse.numberOfSessions,
          numberOfRatedSessions: jsonResponse.numberOfRatedSessions,
          areas: jsonResponse.areas,
          partnerRating: jsonResponse.partnerRatingRecap.average,
          // dayAvailability:
        };
      }
    }
  );
}

export function verifyCredentials(email: string, password: string) {
  return authenticate(email, password).then(
    async res => {
      const jsonResponse = await res.json();
      if (res.status === 401) {
        return { isValid: false, error: jsonResponse.message };
      }

      if (res.status === 422) {
        return { isValid: false, error: 'Incorrect email or password.' };
      }

      if (jsonResponse.message) {
        return { isValid: false, error: jsonResponse.message };
      }

      if (res.ok && jsonResponse.authToken) {
        return {
          isValid: true,
          id: jsonResponse.id,
          fullName: `${jsonResponse.firstName} ${jsonResponse.familyName}`,
          firstName: jsonResponse.firstName,
          familyName: jsonResponse.familyName,
          authToken: jsonResponse.authToken.id,
          profilePicture: jsonResponse.userDetail.pictureUrl,
          numberOfSessions: jsonResponse.numberOfSessions,
          numberOfRatedSessions: jsonResponse.numberOfRatedSessions,
          areas: jsonResponse.areas,
          partnerRating: jsonResponse.partnerRatingRecap.average,

        };
      }
    }
  );
}

export function getErrorMessage(message: string) {
  switch (message) {
    case 'passcode incorrect':
      return 'Passcode is incorrect';
    case 'passcode expired':
      return 'Passcode has expired';
    default:
      return message;
  }
}

export default function useAuth() {
  const history = useHistory();

  const [user, setUser] = useState<{ id: string; displayName: undefined; photoURL: undefined; authToken: string } | null>(null);
  // const [isBookingFetching, setIsBookingFetching] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const getBooking = useCallback(
    (bookingId: number, isPartner?: boolean) => {
      // setIsBookingFetching(true); // ???
    // return contextValue
    //   .getToken(name, room)
    //   .then(res => {
    //     setRoomType(res.room_type);
    //     setIsFetching(false);
    //     return res;
    //   })
    //   .catch(err => {
    //     setError(err);
    //     setIsFetching(false);
    //     return Promise.reject(err);
      return fetchBooking(user!.id, bookingId, user!.authToken, isPartner)
        .then(async res => {
          if (res.ok) {
            return res;
          }
          const json = await res.json();
          const errorMessage = getErrorMessage(json.message || res.statusText);
          throw Error(errorMessage);
        })
        .then(res => res.json());
        // .finally(() => setIsBookingFetching(false)) // ???
    },
    [user]
  );

  // const getToken = useCallback(
  //   (name: string, room: string) => {
  //     return fetchToken(name, room, user!.passcode)
  //       .then(async res => {
  //         if (res.ok) {
  //           return res;
  //         }
  //         const json = await res.json();
  //         const errorMessage = getErrorMessage(json.error?.message || res.statusText);
  //         throw Error(errorMessage);
  //       })
  //       .then(res => res.json());
  //   },
  //   [user]
  // );

  const updateRecordingRules = useCallback(
    async (room_sid, rules) => {
      return fetch('/recordingrules', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ room_sid, rules, passcode: user?.authToken }),
        method: 'POST',
      }).then(async res => {
        const jsonResponse = await res.json();

        if (!res.ok) {
          const error = new Error(jsonResponse.error?.message || 'There was an error updating recording rules');
          error.code = jsonResponse.error?.code;

          return Promise.reject(error);
        }

        return jsonResponse;
      });
    },
    [user]
  );

  const getBookings = useCallback(
    async (params) => {
    // async (params) => {
      // const endpointUrl = `${__API__}/partners/${user?.id}/bookings`;
      const endpointUrl = `${__API__}/partners/${user?.id}/bookings${params && Object.keys(params).length ? '?' + params.toQueryString(params) : ''}`;

      return fetch(endpointUrl, {
        headers: {
          'Content-Type': 'application/json',
          'auth_token': user!.authToken,
        },
        // body: JSON.stringify({ room_sid, rules, passcode: user?.authToken }),
        // method: 'POST',
      }).then(async res => {
        const jsonResponse = await res.json();

        if (!res.ok) {
          const error = new Error(jsonResponse.error?.message || 'There was an error getting bokings');
          error.code = jsonResponse.error?.code;

          return Promise.reject(error);
        }

        return jsonResponse;
      });
    },
    [user]
  );

  const getUpcomingBookings = useCallback(
    async () => {
      var filter = '(status==HAS_A_PARTNER);status!=*CANCELLED*;status!=UNKNOWN';

      const params: BookingOptions = {
          size: 300,
          sort: 'startTime,asc',
          // sort: 'startTime,desc',
          filter
      };

      const endpointUrl = `${__API__}/partners/${user?.id}/bookings?${toQueryString(params)}`;

      return fetch(endpointUrl, {
        headers: {
          'Content-Type': 'application/json',
          'auth_token': user!.authToken,
        },
        // body: JSON.stringify({ room_sid, rules, passcode: user?.authToken }),
        // method: 'POST',
      }).then(async res => {
        const jsonResponse = await res.json();

        if (!res.ok) {
          const error = new Error(jsonResponse.error?.message || 'There was an error getting bokings');
          error.code = jsonResponse.error?.code;

          return Promise.reject(error);
        }

        // setUpcomingBookings(jsonResponse.content as Booking[]);

        return jsonResponse;
      });
    },
    [user]
  );

  const getInProgressBookings = useCallback(
    async () => {
      var filter = '(status==IN_PROGRESS);status!=*CANCELLED*;status!=UNKNOWN';

      const params: BookingOptions = {
          size: 1,
          sort: 'startTime,desc',
          filter
      };

      const endpointUrl = `${__API__}/partners/${user?.id}/bookings?${toQueryString(params)}`;

      return fetch(endpointUrl, {
        headers: {
          'Content-Type': 'application/json',
          'auth_token': user!.authToken,
        },
        // body: JSON.stringify({ room_sid, rules, passcode: user?.authToken }),
        // method: 'POST',
      }).then(async res => {
        const jsonResponse = await res.json();

        if (!res.ok) {
          const error = new Error(jsonResponse.error?.message || 'There was an error getting bokings');
          error.code = jsonResponse.error?.code;

          return Promise.reject(error);
        }

        // setInProgressBookings(jsonResponse.content as Booking[]);

        return jsonResponse;
      });
    },
    [user]
  );


  useEffect(() => {
    // const authToken = getAuthToken();
    // const userId = getUserId();
    const email = getEmail();
    const password = getPassword();

    if (email && password) {
      verifyCredentials(email, password)
        .then(verification => {
          if (verification?.isValid) {
            setUser({
              id: verification.id,
              authToken: verification.authToken,
              displayName: verification.fullName,
              firstName: verification.firstName,
              familyName: verification.familyName,
              photoURL: verification.profilePicture,
              numberOfSessions: verification.numberOfSessions,
              numberOfRatedSessions: verification.numberOfSessions,
              areas: verification.areas,
              partnerRating: verification.partnerRating,

            } as any);
            window.sessionStorage.setItem('email', email);
            window.sessionStorage.setItem('password', password);
            history.replace(window.location.pathname);
          }
        })
        .then(() => setIsAuthReady(true));
    } else {
      setIsAuthReady(true);
    }
  }, [history]);

  const signIn = useCallback((email: string, password: string) => {
    return verifyCredentials(email, password).then(verification => {
      if (verification?.isValid) {
        setUser({
          id: verification.id,
          authToken: verification.authToken,
          displayName: verification.fullName,
          firstName: verification.firstName,
          familyName: verification.familyName,
          photoURL: verification.profilePicture,
          numberOfSessions: verification.numberOfSessions,
          numberOfRatedSessions: verification.numberOfRatedSessions,
          areas: verification.areas,
          partnerRating: verification.partnerRating,

        } as any);
        window.sessionStorage.setItem('userId', verification.id);
        window.sessionStorage.setItem('auth_token', verification.authToken);
        window.sessionStorage.setItem('email', email);
        window.sessionStorage.setItem('password', password);
      } else {
        throw new Error(getErrorMessage(verification?.error));
      }
    });
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    window.sessionStorage.removeItem('passcode');
    window.sessionStorage.removeItem('userId');
    window.sessionStorage.removeItem('auth_token');
    window.sessionStorage.removeItem('email');
    window.sessionStorage.removeItem('password');
    return Promise.resolve();
  }, []);

  return {
    user,
    // bookings,
    // upcomingBookings,
    // inProgressBookings,
    isAuthReady,
    // isBookingFetching,
    // setIsBookingFetching,
    getBooking,
    getBookings,
    getUpcomingBookings,
    getInProgressBookings,
    signIn,
    signOut,
    updateRecordingRules
  };
}
