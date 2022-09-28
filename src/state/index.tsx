import React, { createContext, useContext, useReducer, useState } from 'react';
import { RecordingRules, RoomType, AuthToken, Booking, Areas, DayAvailability } from '../types';
import { TwilioError } from 'twilio-video';
import { settingsReducer, initialSettings, Settings, SettingsAction } from './settings/settingsReducer';
import useActiveSinkId from './useActiveSinkId/useActiveSinkId';
import useFirebaseAuth from './useFirebaseAuth/useFirebaseAuth';
import { useLocalStorageState } from '../hooks/useLocalStorageState/useLocalStorageState';
import usePasscodeAuth from './usePasscodeAuth/usePasscodeAuth';
import useAuth from './useAuth/useAuth';
import { User } from 'firebase/auth';
import { __API__ } from '../constants';


export interface StateContextType {
  error: TwilioError | Error | null;
  setError(error: TwilioError | Error | null): void;
  getBookings(params: any): Promise<{ content: Booking[] }>;
  getUpcomingBookings(params?: any): Promise<{ content: Booking[] }>;
  getInProgressBookings(params?: any): Promise<{ content: Booking[] }>;
  getBooking(bookingId: number, isPartner?: boolean): Promise<Booking>;
  getToken(name: string, room: string, passcode?: string): Promise<{ room_type: RoomType; token: string }>;
  user?: null | {
    id?: string;
    authToken?: string
    displayName?: undefined;
    firstName?: string;
    familyName?: string;
    photoURL?: undefined;
    numberOfSessions?: number;
    areas?: string[];
    partnerRating?: number;
  };
  booking: Booking;
  bookings?: Booking[];
  upcomingBookings?: Booking[] | null;
  inProgressBookings?: Booking[] | null;
  dayAvailability?: DayAvailability[];
  setDayAvailability: React.Dispatch<React.SetStateAction<DayAvailability[]>>;
  signIn?(email: string, password: string): Promise<void>;
  signOut?(): Promise<void>;
  isAuthReady?: boolean;
  isFetching: boolean;
  activeSinkId: string;
  setActiveSinkId(sinkId: string): void;
  settings: Settings;
  dispatchSetting: React.Dispatch<SettingsAction>;
  roomType?: RoomType;
  updateRecordingRules(room_sid: string, rules: RecordingRules): Promise<object>;
  updatePartnerCoverage(partnerId: string, areas: Areas): Promise<object>;
  runningLate(partnerId: string, bookingId: number, delayInMinutes?: number): Promise<object>;
  // setRunningLate(partnerId: string, bookingId: string, delayInMinutes?: number): Promise<object>;
  rateCustomer(partnerId: string, bookingId: number, strength: number, endurance: number, fitness: number, overall: number, comment: string): Promise<object>;
  startSession(partnerId: string, bookingId: number): Promise<object>;
  stopSession(partnerId: string, bookingId: number): Promise<object>;
  declineSession(partnerId: string, bookingId: number): Promise<object>;
  cancelSession(partnerId: string, bookingId: number): Promise<object>;
  getAvailability(partnerId: string): Promise<{ dayAvailability: object }>;
  updateAvailability(partnerId: string, dayAvailability: DayAvailability[]): Promise<object>;
  recoverPassword(email: string): Promise<object>;
  code?: number | string;
  passwordReset: boolean;
  isGalleryViewActive: boolean;
  setIsGalleryViewActive: React.Dispatch<React.SetStateAction<boolean>>;
  maxGalleryViewParticipants: number;
  setMaxGalleryViewParticipants: React.Dispatch<React.SetStateAction<number>>;
}

export const StateContext = createContext<StateContextType>(null!);

/*
  The 'react-hooks/rules-of-hooks' linting rules prevent React Hooks from being called
  inside of if() statements. This is because hooks must always be called in the same order
  every time a component is rendered. The 'react-hooks/rules-of-hooks' rule is disabled below
  because the "if (process.env.REACT_APP_SET_AUTH === 'firebase')" statements are evaluated
  at build time (not runtime). If the statement evaluates to false, then the code is not
  included in the bundle that is produced (due to tree-shaking). Thus, in this instance, it
  is ok to call hooks inside if() statements.
*/
export default function AppStateProvider(props: React.PropsWithChildren<{}>) {
  const [error, setError] = useState<TwilioError | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isGalleryViewActive, setIsGalleryViewActive] = useLocalStorageState('gallery-view-active-key', true);
  const [activeSinkId, setActiveSinkId] = useActiveSinkId();
  const [settings, dispatchSetting] = useReducer(settingsReducer, initialSettings);
  const [roomType, setRoomType] = useState<RoomType>();

  // const [bookings, setBookings] = useState<Booking[] | null>([]);
  // const [bookings, setBookings] = useState<Booking[] | null>([]);

  const [authToken, setAuthToken] = useState('');
  const [booking, setBooking] = useState<Booking>();
  // const [booking, setBooking] = useState<{ twilioRoomName: string; twilioAccessToken: string }>();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[] | null>([]);
  const [inProgressBookings, setInProgressBookings] = useState<Booking[] | null>([]);
  const [dayAvailability, setDayAvailability] = useState<DayAvailability[]>([]);
  const [passwordReset, setPasswordReset] = useState<boolean>(false);
  const [code, setCode] = useState<number | string | null>(null);
  const [maxGalleryViewParticipants, setMaxGalleryViewParticipants] = useLocalStorageState(
    'max-gallery-participants-key',
    6
  );

  let contextValue = {
    error,
    setError,
    isFetching,
    // getBooking,
    // getBookings,
    // getUpcomingBookings,
    // getInProgressBookings,
    // updatePartnerCoverage,
    activeSinkId,
    setActiveSinkId,
    booking,
    bookings,
    upcomingBookings,
    inProgressBookings,
    dayAvailability,
    setDayAvailability,
    settings,
    dispatchSetting,
    roomType,
    code,
    passwordReset,
    isGalleryViewActive,
    setIsGalleryViewActive,
    maxGalleryViewParticipants,
    setMaxGalleryViewParticipants,
  } as StateContextType;

  // if (process.env.REACT_APP_SET_AUTH === 'firebase') {
  //   contextValue = {
  //     ...contextValue,
  //     ...useFirebaseAuth(), // eslint-disable-line react-hooks/rules-of-hooks
  //   };
  // } else if (process.env.REACT_APP_SET_AUTH === 'passcode') {
  //   contextValue = {
  //     ...contextValue,
  //     ...usePasscodeAuth(), // eslint-disable-line react-hooks/rules-of-hooks
  //   };
  // } else {
    contextValue = {
      ...contextValue,
      ...useAuth(), // eslint-disable-line react-hooks/rules-of-hooks
      // Move to separate module
      updatePartnerCoverage: async (partnerId, areas) => {
        const endpointUrl = `${__API__}/partners/${partnerId}/coverage`; //process.env.REACT_APP_TOKEN_ENDPOINT || '/recordingrules';

        const token = window.sessionStorage.getItem('auth_token') || '';

        return fetch(endpointUrl, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': token
          },
          body: JSON.stringify({
            areas
          }),
          method: 'POST',
        })
          .then(async res => {
            const jsonResponse = await res.json();

            if (!res.ok) {
              const recordingError = new Error(
                jsonResponse.error?.message || 'There was an error updating partner coverage'
              );
              recordingError.code = jsonResponse.error?.code;
              return Promise.reject(recordingError);
            }

            return jsonResponse;
          })
          .catch(err => setError(err));
      },
      // setRunningLate: async (partnerId, bookingId) => {
      runningLate: async (partnerId: string, bookingId: number, delayInMinutes?: number) => {
        // POST /partners/{partnerId}/bookings/{bookingId}/running-late
        const endpointUrl = `${__API__}/partners/${partnerId}/bookings/${bookingId}/running-late`; //process.env.REACT_APP_TOKEN_ENDPOINT || '/recordingrules';

        const token = window.sessionStorage.getItem('auth_token') || '';

        return fetch(endpointUrl, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': token
          },
          body: JSON.stringify({
            delayInMinutes: 15 || delayInMinutes || 15,
          }),
          method: 'POST',
        })
          .then(async res => {
            const jsonResponse = await res.json();

            if (!res.ok) {
              const runningLateError = new Error(
                jsonResponse.error?.message || 'There was an error fetching running late'
              );
              runningLateError.code = jsonResponse.error?.message;
              return Promise.reject(runningLateError);
            }

            // if (!res.ok) {
            //   const recordingError = new Error(
            //     jsonResponse.error?.message ||
            //   );
            //   recordingError.code = jsonResponse.error?.code;
            //   return Promise.reject(recordingError);
            // }

            return jsonResponse;
          })
          .catch(err => setError(err));
      },

      rateCustomer(partnerId: string, bookingId: number, strength: number, endurance: number, fitness: number, overall: number, comment: string) {
        const endpointUrl = `${__API__}/partners/${partnerId}/bookings/${bookingId}/user-rating`; //process.env.REACT_APP_TOKEN_ENDPOINT || '/recordingrules';

        const token = window.sessionStorage.getItem('auth_token') || '';

        return fetch(endpointUrl, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': token
          },
          body: JSON.stringify({
            // average: 0,
            strengthRating: strength,
            enduranceRating: endurance,
            fitnessRating: fitness,
            overallExperienceRating: overall,
            comment,
          }),
          method: 'POST',
        })
          .then(async res => {
            const jsonResponse = await res.json();

            if (!res.ok) {
              const rateCustomerError = new Error(
                jsonResponse.error?.message || 'There was an error setting customer rating'
              );
              rateCustomerError.code = jsonResponse.error?.message;
              return Promise.reject(rateCustomerError);
            }

            // if (!res.ok) {
            //   const recordingError = new Error(
            //     jsonResponse.error?.message ||
            //   );
            //   recordingError.code = jsonResponse.error?.code;
            //   return Promise.reject(recordingError);
            // }

            return jsonResponse;
          })
          .catch(err => setError(err));


        // PartnerRateCustomerSessionHUCRequest request = new PartnerRateCustomerSessionHUCRequest(mapper, partner.getAuthToken().getId(), partner.getId(),
        //         getId(), strength, endurance, fitness, overall, comment);
        // Booking.PartnerRating rating = client.executeAndGetAs(request, PartnerRateCustomerSessionHUCResponse.class).get();
        // setPartnerRating(rating);
      },

      startSession(partnerId: string, bookingId: number) {
        // PartnerStartSessionHUCRequest req = new PartnerStartSessionHUCRequest(mapper,  partner.getAuthToken().getId(),partner.getId(), getId());
        // Booking booking = client.executeAndGetAs(req, PartnerStartSessionHUCResponse.class).get();
        // this.setStatus(booking.getStatus());
        // return booking;

        const endpointUrl = `${__API__}/partners/${partnerId}/bookings/${bookingId}/session`; //process.env.REACT_APP_TOKEN_ENDPOINT || '/recordingrules';

        const token = window.sessionStorage.getItem('auth_token') || '';

        return fetch(endpointUrl, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': token
          },
          // body: JSON.stringify({
          // }),
          method: 'POST',
        })
          .then(async res => {
            const jsonResponse = await res.json();

            if (!res.ok) {
              const startSessionError = new Error(
                jsonResponse.error?.message || 'There was an error starting a session'
              );
              startSessionError.code = jsonResponse.error?.message;
              return Promise.reject(startSessionError);
            }

            return jsonResponse;
          })
          .catch(err => setError(err));
      },

      stopSession(partnerId: string, bookingId: number) {
        // PartnerStartSessionHUCRequest req = new PartnerStartSessionHUCRequest(mapper,  partner.getAuthToken().getId(),partner.getId(), getId());
        // Booking booking = client.executeAndGetAs(req, PartnerStartSessionHUCResponse.class).get();
        // this.setStatus(booking.getStatus());
        // return booking;

        const endpointUrl = `${__API__}/partners/${partnerId}/bookings/${bookingId}/session/stop`; //process.env.REACT_APP_TOKEN_ENDPOINT || '/recordingrules';

        const token = window.sessionStorage.getItem('auth_token') || '';

        return fetch(endpointUrl, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': token
          },
          // body: JSON.stringify({
          // }),
          method: 'POST',
        })
          .then(async res => {
            const jsonResponse = await res.json();

            if (!res.ok) {
              const startSessionError = new Error(
                jsonResponse.error?.message || 'There was an error stopping a session'
              );
              startSessionError.code = jsonResponse.error?.message;
              return Promise.reject(startSessionError);
            }

            return jsonResponse;
          })
          .catch(err => setError(err));
      },

      declineSession(partnerId: string, bookingId: number) {
        // PartnerStartSessionHUCRequest req = new PartnerStartSessionHUCRequest(mapper,  partner.getAuthToken().getId(),partner.getId(), getId());
        // Booking booking = client.executeAndGetAs(req, PartnerStartSessionHUCResponse.class).get();
        // this.setStatus(booking.getStatus());
        // return booking;

        // /partners/"+partnerId+"/bookings/"+bookingId+"/session-declined
        const endpointUrl = `${__API__}/partners/${partnerId}/bookings/${bookingId}/session-declined`; //process.env.REACT_APP_TOKEN_ENDPOINT || '/recordingrules';

        const token = window.sessionStorage.getItem('auth_token') || '';

        return fetch(endpointUrl, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': token
          },
          // body: JSON.stringify({
          // }),
          method: 'POST',
        })
          .then(async res => {
            const jsonResponse = await res.json();

            if (!res.ok) {
              const declineSessionError = new Error(
                jsonResponse.error?.message || 'There was an error declining a session'
              );
              declineSessionError.code = jsonResponse.error?.message;
              return Promise.reject(declineSessionError);
            }

            return jsonResponse;
          })
          .catch(err => setError(err));
      },

      cancelSession(partnerId: string, bookingId: number) {
        const endpointUrl = `${__API__}/partners/${partnerId}/bookings/${bookingId}/cancellation`; //process.env.REACT_APP_TOKEN_ENDPOINT || '/recordingrules';

        const token = window.sessionStorage.getItem('auth_token') || '';

        return fetch(endpointUrl, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': token
          },
          // body: JSON.stringify({
          // }),
          method: 'POST',
        })
          .then(async res => {
            const jsonResponse = await res.json();

            if (!res.ok) {
              const cencelSessionError = new Error(
                jsonResponse.error?.message || 'There was an error cancelling a session'
              );
              cencelSessionError.code = jsonResponse.error?.message;
              return Promise.reject(cencelSessionError);
            }

            return jsonResponse;
          })
          .catch(err => setError(err));
      },

      getAvailability(partnerId: string) {
        const endpointUrl = `${__API__}/partners/${partnerId}/availability`; //process.env.REACT_APP_TOKEN_ENDPOINT || '/recordingrules';

        const token = window.sessionStorage.getItem('auth_token') || '';

        return fetch(endpointUrl, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': token
          },
          // body: JSON.stringify({
          // }),
          // method: 'POST',
        })
          .then(async res => {
            const jsonResponse = await res.json();

            if (!res.ok) {
              const getAvailabilityError = new Error(
                jsonResponse.error?.message || 'There was an error loading the availability'
              );
              getAvailabilityError.code = jsonResponse.error?.message;
              return Promise.reject(getAvailabilityError);
            }

            return jsonResponse;
          })
          .catch(err => setError(err));
      },

      /**
       * In the following format
       *  {
       *    "dayAvailability": [
       *      {
       *        "day": "string",
       *        "timeSlots": [
       *          {
       *            "startTime": "string"
       *          }
       *        ]
       *      }
       *    ]
       *  }
       */
      updateAvailability(partnerId: string, dayAvailability: DayAvailability[]) {
        const endpointUrl = `${__API__}/partners/${partnerId}/availability`; //process.env.REACT_APP_TOKEN_ENDPOINT || '/recordingrules';

        const token = window.sessionStorage.getItem('auth_token') || '';

        if (!dayAvailability) {
          return Promise.reject();
        }

        return fetch(endpointUrl, {
          headers: {
            'Content-Type': 'application/json',
            'auth_token': token
          },
          body: JSON.stringify({
            dayAvailability
            // dayAvailability.map(v => {
            //   return {
            //     day: v.day,
            //     timeSlots: v.timeSlots.map(ts => ({ startTime: ts.startTime }))
            //   };
            // })
          }),
          method: 'POST',
        })
          .then(async res => {
            const jsonResponse = await res.json();

            if (!res.ok) {
              const updateAvailabilityError = new Error(
                jsonResponse.error?.message || 'There was an error updating the availability'
              );
              updateAvailabilityError.code = jsonResponse.error?.message;
              return Promise.reject(updateAvailabilityError);
            }

            return jsonResponse;
          })
          .catch(err => setError(err));
      },

      /* Customer recovers password */
      recoverPassword(email: string) {
        const endpointUrl = `${__API__}/users/forgotten-password`; //process.env.REACT_APP_TOKEN_ENDPOINT || '/recordingrules';

        window.sessionStorage.setItem('password_recovery_email', email);

        return fetch(endpointUrl, {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email
          }),
          method: 'POST',
        })
          .then(async res => {
            const jsonResponse = await res.json();

            if (!res.ok) {
              const updateAvailabilityError = new Error(
                jsonResponse.error?.message || 'There was an error updating the availability'
              );
              updateAvailabilityError.code = jsonResponse.error?.message;
              return Promise.reject(updateAvailabilityError);
            }

            return jsonResponse;
          })
          .catch(err => setError(err));
      },


      // public Booking stopSession(Partner partner) {
      //     PartnerStopSessionHUCRequest req = new PartnerStopSessionHUCRequest(mapper, partner.getAuthToken().getId(), partner.getId() , getId());
      //     Booking booking =  client.executeAndGetAs(req, PartnerStopSessionHUCResponse.class).get();
      //     this.setStatus(booking.getStatus());
      //     return booking;
      // }

      // public void declineSession(Partner partner, String reason) {

      //     PartnerDeclineSessionHUCRequest req = new PartnerDeclineSessionHUCRequest(mapper, partner.getAuthToken().getId(), partner.getId(), getId(), reason);
      //     client.execute(req);
      // }

      // public void cancelSession(Partner partner) {
      //     PartnerCancelSessionHUCRequest req = new PartnerCancelSessionHUCRequest(mapper, partner.getAuthToken().getId(), partner.getId() , getId());
      //     client.execute(req);
      // }


    };
  // }// else {
    // contextValue = {
    //   ...contextValue,
    //   signIn: async (email, password) => {
    //     const endpoint = `${__API__}/users/auth`; // process.env.REACT_APP_TOKEN_ENDPOINT || '/token';

    //     return fetch(endpoint, {
    //       method: 'POST',
    //       headers: {
    //         'content-type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         email,
    //         password,
    //         // create_conversation: process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true',
    //       }),
    //     }).then(res => res.json())
    //   },
    //   getBooking: async (userId: string, bookingId: string, isPartner?: boolean) => {
    //     const endpoint = `${__API__}/users/${userId}/bookings/${bookingId}`; // process.env.REACT_APP_TOKEN_ENDPOINT || '/token';

    //     return fetch(endpoint, {
    //       method: 'GET',
    //       headers: {
    //         'content-type': 'application/json',
    //         'auth_token': authToken,
    //       },
    //       // body: JSON.stringify({
    //       //   user_identity,
    //       //   room_name,
    //       //   create_conversation: process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true',
    //       // }),
    //     }).then(res => res.json());
    //   },
    //   getToken: async (user_identity, room_name) => {
    //     const endpoint = process.env.REACT_APP_TOKEN_ENDPOINT || '/token';

    //     return fetch(endpoint, {
    //       method: 'POST',
    //       headers: {
    //         'content-type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         user_identity,
    //         room_name,
    //         create_conversation: process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true',
    //       }),
    //     }).then(res => res.json());
    //   },
    //   updateRecordingRules: async (room_sid, rules) => {
    //     const endpoint = process.env.REACT_APP_TOKEN_ENDPOINT || '/recordingrules';

    //     return fetch(endpoint, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ room_sid, rules }),
    //       method: 'POST',
    //     })
    //       .then(async res => {
    //         const jsonResponse = await res.json();

    //         if (!res.ok) {
    //           const recordingError = new Error(
    //             jsonResponse.error?.message || 'There was an error updating recording rules'
    //           );
    //           recordingError.code = jsonResponse.error?.code;
    //           return Promise.reject(recordingError);
    //         }

    //         return jsonResponse;
    //       })
    //       .catch(err => setError(err));
    //   },
    // };
  // }

  const getToken: StateContextType['getToken'] = (name, room) => {
    setIsFetching(true);
    return contextValue
      .getToken(name, room)
      .then(res => {
        setRoomType(res.room_type);
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };


  const getBooking: StateContextType['getBooking'] = (bookingId, isPartner) => {
    setIsFetching(true);
    return contextValue
      .getBooking(bookingId, isPartner)
      .then(res => {
        setBooking(res as Booking);
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  const getBookings: StateContextType['getBookings'] = (params) => {
    setIsFetching(true);
    return contextValue
      .getBookings(params)
      .then(res => {
        setBookings(res.content as Booking[]);
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  const getUpcomingBookings: StateContextType['getUpcomingBookings'] = (params?) => {
    setIsFetching(true);
    return contextValue
      .getUpcomingBookings(params)
      .then(res => {
        setUpcomingBookings(res.content as Booking[]);
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  const getInProgressBookings: StateContextType['getInProgressBookings'] = (params?) => {
    setIsFetching(true);
    return contextValue
      .getInProgressBookings(params)
      .then(res => {
        setInProgressBookings(res.content as Booking[]);
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  const updateRecordingRules: StateContextType['updateRecordingRules'] = (room_sid, rules) => {
    setIsFetching(true);
    return contextValue
      .updateRecordingRules(room_sid, rules)
      .then(res => {
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  const updatePartnerCoverage: StateContextType['updatePartnerCoverage'] = (partnerId, areas) => {
    setIsFetching(true);
    return contextValue
      .updatePartnerCoverage(partnerId, areas)
      .then(res => {
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  const runningLate: StateContextType['runningLate'] = (partnerId: string, bookingId: number, delayInMinutes?: number) => {
  // const runningLate: StateContextType['setRunningLate'] = (partnerId: string, bookingId: number) => {
    setIsFetching(true);
    return contextValue
      .runningLate(partnerId, bookingId, delayInMinutes)
      .then(res => {
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  const rateCustomer: StateContextType['rateCustomer'] = (partnerId: string, bookingId: number, strength: number, endurance: number, fitness: number, overall: number, comment: string) => {
  // const addCustomerRating: StateContextType['addCustomerRating'] = (partnerId: string, bookingId: number, strength: number, endurance: number, fitness: number, overall: number, comment: string) => {
    setIsFetching(true);
    return contextValue
      .rateCustomer(partnerId, bookingId, strength, endurance, fitness, overall, comment)
      .then(res => {
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  const startSession: StateContextType['startSession'] = (partnerId: string, bookingId: number) => {
    setIsFetching(true);
    return contextValue
      .startSession(partnerId, bookingId)
      .then(res => {
        setBooking(res as Booking);
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  const stopSession: StateContextType['stopSession'] = (partnerId: string, bookingId: number) => {
    setIsFetching(true);
    return contextValue
      .stopSession(partnerId, bookingId)
      .then(res => {
        setBooking(res as Booking);
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  const declineSession: StateContextType['declineSession'] = (partnerId: string, bookingId: number) => {
    setIsFetching(true);
    return contextValue
      .declineSession(partnerId, bookingId)
      .then(res => {
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  const cancelSession: StateContextType['cancelSession'] = (partnerId: string, bookingId: number) => {
    setIsFetching(true);
    return contextValue
      .cancelSession(partnerId, bookingId)
      .then(res => {
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  const getAvailability: StateContextType['getAvailability'] = (partnerId: string) => {
    setIsFetching(true);
    return contextValue
      .getAvailability(partnerId)
      .then(res => {
        setDayAvailability(res.dayAvailability as DayAvailability[]);
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  const updateAvailability: StateContextType['updateAvailability'] = (partnerId: string, dayAvailability: DayAvailability[]) => {
    setIsFetching(true);
    return contextValue
      .updateAvailability(partnerId, dayAvailability)
      .then(res => {
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  const recoverPassword: StateContextType['recoverPassword'] = (email: string) => {
    setIsFetching(true);
    return contextValue
      .recoverPassword(email)
      .then(res => {
        // setCode(res);
        setPasswordReset(true);
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };


  // const signIn: StateContextType['signIn'] = (email, password) => {
  //   setIsFetching(true);
  //   return contextValue
  //     .signIn(email, password)
  //     .then(res => {
  //       setAuthToken(res?.authToken?.id);
  //       setIsFetching(false);
  //       return res;
  //     })
  //     .catch(err => {
  //       setError(err);
  //       setIsFetching(false);
  //       return Promise.reject(err);
  //     });
  // };

  return (
    <StateContext.Provider
      value={{
        ...contextValue,
        getUpcomingBookings,
        getInProgressBookings,
        getBooking,
        updatePartnerCoverage,
        runningLate, // setRunningLate,
        rateCustomer, // addCustomerRating,
        startSession,
        stopSession,
        declineSession,
        cancelSession,
        getAvailability,
        updateAvailability,
        recoverPassword,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within the AppStateProvider');
  }
  return context;
}
