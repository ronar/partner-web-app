import { LocalVideoTrack, RemoteVideoTrack, TwilioError } from 'twilio-video';

declare module 'twilio-video' {
  // These help to create union types between Local and Remote VideoTracks
  interface LocalVideoTrack {
    isSwitchedOff: undefined;
    setPriority: undefined;
  }
}

declare global {
  interface MediaDevices {
    getDisplayMedia(constraints: MediaStreamConstraints): Promise<MediaStream>;
  }

  interface HTMLMediaElement {
    setSinkId?(sinkId: string): Promise<undefined>;
  }

  // Helps create a union type with TwilioError
  interface Error {
    code: undefined;
  }
}

export type Callback = (...args: any[]) => void;

export type ErrorCallback = (error: TwilioError | Error) => void;

export type IVideoTrack = LocalVideoTrack | RemoteVideoTrack;

export type RoomType = 'group' | 'group-small' | 'peer-to-peer' | 'go';

export type AuthToken = { id: string };

export type RecordingRule = {
  type: 'include' | 'exclude';
  all?: boolean;
  kind?: 'audio' | 'video';
  publisher?: string;
};

export type Product = {
  id: string;
  labels: {
    displayName: string;
  }
};

export type Address = {
  borough: string;
  buildingNumber: string;
  city: string;
  country: string;
  county: string;
  firstStreet: string;
  homeNumber: string;
  id: number;
  latitude: number;
  longitude: number;
  postCode: string;
  province: string;
  region: string;
  secondStreet: string;
}

export type Booking = {
  id: number;
  product: Product;
  startTime: number;
  // user: { firstName: string; familyName: string }
  twilioRoomName: string;
  twilioAccessToken: string;
  partner: object;
  status: string;
  roomUrl: string;
  preferences: {
    notes: string;
  },
  customer?: {
    id: string;
    firstName: string;
    familyName: string;
    medicalInformationList: string[],
    userDetail: {
      ageRange: object;
      gender: string;
      phoneNumber: string;
    },
  },
  user?: {
    id: string;
    firstName: string;
    familyName: string;
    medicalInformationList: string[],
    userDetail: {
      ageRange: object;
      gender: string;
      phoneNumber: string;
    },
  },
  isOnline: boolean,
  location: Address,

  // type: 'include' | 'exclude';
  // all?: boolean;
  // kind?: 'audio' | 'video';
  // publisher?: string;
};

export type Area = {
  outward: string;
  town: string;
  county?: string;
  coordinates?: number[];
};

export type RecordingRules = RecordingRule[];
export type Areas = string[]

export interface BookingOptions {
  size: number;
  sort: string;
  filter: string;
  // audio?: boolean | CreateLocalTrackOptions| CreateLocalAudioTrackOptions;
  // automaticSubscription?: boolean;
  // bandwidthProfile?: BandwidthProfileOptions;
  // dominantSpeaker?: boolean;

  // /**
  //  * @deprecated use enableDscp
  //  */
  // dscpTagging?: boolean;
  // enableDscp?: boolean;

  // /**
  //  * @deprecated use Video.Logger
  //  */
  // loggerName?: string;
  // eventListener?: EventListener;
  // iceServers?: Array<RTCIceServer>;
  // iceTransportPolicy?: RTCIceTransportPolicy;
  // insights?: boolean;
  // maxAudioBitrate?: number | null;
  // maxVideoBitrate?: number | null;
  // name?: string | null;
  // networkQuality?: boolean | NetworkQualityConfiguration;
  // notifyWarnings?: Array<NotifyWarning>;
  // region?: string;
  // preferredAudioCodecs?: Array<AudioCodec | AudioCodecSettings | OpusCodecSettings>;
  // preferredVideoCodecs?: Array<VideoCodec | VideoCodecSettings | VP8CodecSettings> | VideoEncodingMode;

  // /**
  //  * @deprecated use Video.Logger.
  //  */
  // logLevel?: LogLevel | LogLevels;

  // tracks?: Array<LocalTrack | MediaStreamTrack>;
  // video?: boolean | CreateLocalTrackOptions;
}
