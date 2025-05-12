import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  FormGroup,
  FormControlLabel,
  Switch,
  Alert,
} from '@mui/material';
import axios from '../config/axios';
import {
  serviceOptions,
  languageOptions,
  voiceOptions,
  genderOptions,
  getDefaultLanguage,
  getDefaultService,
  getDefaultVoice,
  getDefaultText,
  getDefaultSsml,
  getLanguageCode,
  getDefaultGender,
} from '../config/tts';
import apiPath from '../config/api-path';
// import { webrtcPort } from '../config/general';

export default function VideoProcessingPage() {
  // Avatar state
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [avatarVideoUrl, setAvatarVideoUrl] = useState('');
  const [avatarVideoLoading, setAvatarVideoLoading] = useState(false);
  const [avatarVideoError, setAvatarVideoError] = useState('');

  // TTS state
  const defaultService = getDefaultService();
  const defaultLanguage = getDefaultLanguage(defaultService);
  const defaultGender = getDefaultGender(defaultService, defaultLanguage);
  const defaultVoice = getDefaultVoice(
    defaultService,
    defaultGender,
    defaultLanguage
  );
  const defaultText = getDefaultText();

  const [service, setService] = useState(defaultService);
  const [language, setLanguage] = useState(defaultLanguage);
  const [gender, setGender] = useState(defaultGender);
  const [voice, setVoice] = useState(defaultVoice);
  const [speed, setSpeed] = useState(1.0);
  const [text, setText] = useState(defaultText);
  const [ssmlEnable, setSsmlEnable] = useState(false);
  const [ssml, setSsml] = useState('');
  const [ttsLoading, setTtsLoading] = useState(false);
  const [ttsError, setTtsError] = useState('');
  const [ttsVideoUrl, setTtsVideoUrl] = useState('');

  // Video playback control
  const videoRef = useRef(null);
  const [isPlayingTts, setIsPlayingTts] = useState(false);
  const originalVideoUrl = useRef('');

  // Load avatars on mount
  useEffect(() => {
    async function fetchAvatars() {
      try {
        const res = await axios.get(apiPath.avatar_list);
        setAvatars(res.data.avatarIds || []);
      } catch {
        setAvatarVideoError('Failed to load avatars.');
      }
    }
    fetchAvatars();
  }, []);

  // Fetch avatar video when avatar changes
  useEffect(() => {
    if (!selectedAvatar) return;
    setAvatarVideoLoading(true);
    setAvatarVideoError('');
    setAvatarVideoUrl('');
    setTtsVideoUrl('');
    setIsPlayingTts(false);
    async function fetchVideo() {
      try {
        const res = await axios.get(
          `${apiPath.avatar_video}?avatar_id=${selectedAvatar}`,
          { responseType: 'blob' }
        );
        const url = URL.createObjectURL(res.data);
        setAvatarVideoUrl(url);
        originalVideoUrl.current = url;
      } catch {
        setAvatarVideoError('Failed to load avatar video.');
      } finally {
        setAvatarVideoLoading(false);
      }
    }
    fetchVideo();
    // Cleanup old video URL
    return () => {
      if (avatarVideoUrl) URL.revokeObjectURL(avatarVideoUrl);
    };
    // eslint-disable-next-line
  }, [selectedAvatar]);

  // Video event handler for looping and TTS playback
  const handleVideoEnded = () => {
    if (isPlayingTts) {
      setIsPlayingTts(false);
    }
  };

  // Play TTS video after current loop
  const playTtsVideo = () => {
    if (ttsVideoUrl) {
      setIsPlayingTts(true);
    }
  };

  // Switch video src directly via ref to avoid flash
  useEffect(() => {
    if (videoRef.current) {
      if (isPlayingTts && ttsVideoUrl) {
        videoRef.current.src = ttsVideoUrl;
        videoRef.current.loop = false;

        // Wait for the video to be ready before playing
        const playWhenReady = () => {
          videoRef.current.play().catch(() => {});
          videoRef.current.removeEventListener('loadeddata', playWhenReady);
        };
        videoRef.current.addEventListener('loadeddata', playWhenReady);
      } else if (avatarVideoUrl) {
        videoRef.current.src = avatarVideoUrl;
        videoRef.current.loop = true;

        const playWhenReady = () => {
          videoRef.current.play().catch(() => {});
          videoRef.current.removeEventListener('loadeddata', playWhenReady);
        };
        videoRef.current.addEventListener('loadeddata', playWhenReady);
      }
    }
    // eslint-disable-next-line
  }, [isPlayingTts, ttsVideoUrl, avatarVideoUrl]);

  // TTS API call
  const handleSpeak = async () => {
    setTtsLoading(true);
    setTtsError('');
    setTtsVideoUrl('');
    try {
      const params = new URLSearchParams();
      params.append('service', service);
      params.append('language', getLanguageCode(language, service));
      params.append('voice', voice);
      params.append('gender', gender);
      params.append('speed', speed.toString());
      params.append('text', text);
      params.append('avatar_id', selectedAvatar);
      const res = await axios.post(apiPath.avatar_speak_video, params, {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(res.data);
      setTtsVideoUrl(url);
      // Do NOT call playTtsVideo() here; let useEffect handle it
    } catch {
      setTtsError('Failed to generate TTS video.');
    } finally {
      setTtsLoading(false);
    }
  };

  // Play TTS video as soon as ttsVideoUrl is set
  useEffect(() => {
    if (ttsVideoUrl) {
      playTtsVideo();
    }
    // eslint-disable-next-line
  }, [ttsVideoUrl]);

  // Handlers for streaming buttons (placeholders)
  //   const handleStartStreaming = async () => {
  //     if (!videoRef.current) return;
  //     const stream = videoRef.current.captureStream();

  //     // 1. Create a new RTCPeerConnection (no STUN server)
  //     const pc = new RTCPeerConnection({ iceServers: [] });

  //     // 2. Add video tracks to the connection
  //     stream.getTracks().forEach((track) => pc.addTrack(track, stream));

  //     // 3. Set up signaling (WebSocket to localhost)
  //     const signaling = new WebSocket(`ws://localhost:${webrtcPort}`);
  //     signaling.onopen = async () => {
  //       // 4. Create offer and send to server
  //       const offer = await pc.createOffer();
  //       await pc.setLocalDescription(offer);
  //       signaling.send(JSON.stringify({ type: 'offer', sdp: offer.sdp }));
  //     };

  //     signaling.onmessage = async (event) => {
  //       const message = JSON.parse(event.data);
  //       if (message.type === 'answer') {
  //         await pc.setRemoteDescription({ type: 'answer', sdp: message.sdp });
  //       } else if (message.type === 'candidate') {
  //         await pc.addIceCandidate(message.candidate);
  //       }
  //     };

  //     // 5. Send ICE candidates to the server
  //     pc.onicecandidate = (event) => {
  //       if (event.candidate) {
  //         signaling.send(
  //           JSON.stringify({ type: 'candidate', candidate: event.candidate })
  //         );
  //       }
  //     };
  //   };

  // TTS controls reset
  function resetText(service, language, gender, voice) {
    setSsml(getDefaultSsml(service, language, gender, voice));
    setSpeed(1.0);
    setText(getDefaultText());
  }

  // TTS control handlers (copied from previous structure)
  const handleServiceChange = (event) => {
    setService(event.target.value);
    setLanguage(getDefaultLanguage(event.target.value));
    setGender(
      getDefaultGender(
        event.target.value,
        getDefaultLanguage(event.target.value)
      )
    );
    setVoice(
      getDefaultVoice(
        event.target.value,
        getDefaultGender(
          event.target.value,
          getDefaultLanguage(event.target.value)
        ),
        getDefaultLanguage(event.target.value)
      )
    );
    resetText(
      event.target.value,
      getDefaultLanguage(event.target.value),
      getDefaultGender(
        event.target.value,
        getDefaultLanguage(event.target.value)
      ),
      getDefaultVoice(
        event.target.value,
        getDefaultGender(
          event.target.value,
          getDefaultLanguage(event.target.value)
        ),
        getDefaultLanguage(event.target.value)
      )
    );
  };
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setGender(getDefaultGender(service, event.target.value));
    setVoice(getDefaultVoice(service, gender, event.target.value));
    resetText(
      service,
      event.target.value,
      getDefaultGender(service, event.target.value),
      getDefaultVoice(service, gender, event.target.value)
    );
  };
  const handleVoiceChange = (event) => {
    setVoice(event.target.value);
    resetText(service, language, gender, event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setVoice(getDefaultVoice(service, event.target.value, language));
    resetText(service, language, event.target.value, voice);
  };
  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };
  const handleSSMLChange = (event) => {
    setSsml(event.target.value);
  };
  const handleSsmlEnableChange = (event) => {
    setSsmlEnable(event.target.checked);
    resetText(service, language, gender, voice);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={4}>
        {/* Left Side: Avatar selection and video */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Select Avatar
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="avatar-select-label">Avatar</InputLabel>
                <Select
                  labelId="avatar-select-label"
                  value={selectedAvatar}
                  label="Avatar"
                  onChange={(e) => setSelectedAvatar(e.target.value)}
                >
                  {avatars.map((avatarId) => (
                    <MenuItem key={avatarId} value={avatarId}>
                      {avatarId}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {avatarVideoLoading ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight={200}
                >
                  <CircularProgress />
                </Box>
              ) : avatarVideoError ? (
                <Alert severity="error">{avatarVideoError}</Alert>
              ) : avatarVideoUrl ? (
                <video
                  ref={videoRef}
                  width="100%"
                  autoPlay
                  loop={!isPlayingTts}
                  onEnded={handleVideoEnded}
                  style={{ marginBottom: 16 }}
                />
              ) : null}
              {/* <Box display="flex" gap={2} mt={2}>
                <Button
                  variant="contained"
                  onClick={handleStartStreaming}
                  disabled={!selectedAvatar}
                >
                  Start Streaming
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleStopStreaming}
                  disabled={!selectedAvatar}
                >
                  Stop Streaming
                </Button>
              </Box> */}
            </CardContent>
          </Card>
        </Grid>
        {/* Right Side: TTS controls */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Text to Speech
              </Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="tts-service-label">TTS Service</InputLabel>
                <Select
                  labelId="tts-service-label"
                  value={service}
                  label="Service"
                  onChange={handleServiceChange}
                >
                  {serviceOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="tts-language-label">Language</InputLabel>
                <Select
                  labelId="tts-language-label"
                  value={language}
                  label="Language"
                  onChange={handleLanguageChange}
                >
                  {languageOptions[service].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="tts-gender-label">Gender</InputLabel>
                <Select
                  labelId="tts-gender-label"
                  value={gender}
                  label="Gender"
                  onChange={handleGenderChange}
                >
                  {genderOptions[service][language].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="tts-voice-label">Voice</InputLabel>
                <Select
                  labelId="tts-voice-label"
                  value={voice}
                  label="Voice"
                  onChange={handleVoiceChange}
                >
                  {voiceOptions[service][language][gender].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={ssmlEnable}
                      onChange={handleSsmlEnableChange}
                      name="ssml-enable"
                    />
                  }
                  label="SSML"
                  sx={{ mt: 2, alignSelf: 'flex-end' }}
                />
              </FormGroup>
              {ssmlEnable ? (
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <TextField
                    label="SSML"
                    multiline
                    rows={6}
                    value={ssml}
                    onChange={handleSSMLChange}
                  />
                </FormControl>
              ) : (
                <>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <TextField
                      label="Speed"
                      value={speed}
                      onChange={handleSpeedChange}
                      type="number"
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <TextField
                      label="Text"
                      multiline
                      rows={6}
                      value={text}
                      onChange={handleTextChange}
                    />
                  </FormControl>
                </>
              )}
              <Button
                variant="contained"
                onClick={handleSpeak}
                sx={{ mt: 3 }}
                disabled={ttsLoading || !selectedAvatar}
              >
                {ttsLoading ? <CircularProgress size={24} /> : 'Speak'}
              </Button>
              {ttsError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {ttsError}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
