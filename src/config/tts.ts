const serviceOptions = [{ value: 'azure', label: 'Azure' }];

const languageOptions = {
  aws: [
    { value: 'zh', label: 'Cantonese', code: 'zh-HK' },
    { value: 'cn', label: 'Putonghua', code: 'zh-CN' },
  ],
  azure: [
    { value: 'zh', label: 'Cantonese', code: 'yue-CN' },
    { value: 'cn', label: 'Putonghua', code: 'cmn-CN' },
  ],
};

const genderOptions = {
  aws: {
    zh: [{ value: 'female', label: 'Female' }],
    cn: [{ value: 'female', label: 'Female' }],
  },
  azure: {
    zh: [
      { value: 'female', label: 'Female' },
      { value: 'male', label: 'Male' },
    ],

    cn: [
      { value: 'female', label: 'Female' },
      { value: 'male', label: 'Male' },
    ],
  },
};

const voiceOptions = {
  aws: {
    zh: {
      female: [
        { value: 'Hiujin', label: 'Hiujin (Christina)', gender: 'female' },
      ],
    },
    cn: { female: [{ value: 'Zhiyu', label: 'Zhiyu', gender: 'female' }] },
  },
  azure: {
    zh: {
      female: [
        {
          value: 'yue-CN-XiaoMinNeural',
          label: 'yue-CN-XiaoMinNeural',
          gender: 'female',
        },
        {
          value: 'zh-HK-HiuMaanNeural',
          label: 'zh-HK-HiuMaanNeural',
          gender: 'female',
        },
        {
          value: 'zh-HK-HiuGaaiNeural',
          label: 'zh-HK-HiuGaaiNeural',
          gender: 'female',
        },
      ],
      male: [
        {
          value: 'yue-CN-YunSongNeural',
          label: 'yue-CN-YunSongNeural',
          gender: 'male',
        },
        {
          value: 'zh-HK-WanLungNeural',
          label: 'zh-HK-WanLungNeural',
          gender: 'male',
        },
      ],
    },
    cn: {
      female: [
        {
          value: 'zh-CN-XiaoxiaoNeural',
          label: 'zh-CN-XiaoxiaoNeural',
          gender: 'female',
        },
        {
          value: 'zh-CN-XiaoyiNeural',
          label: 'zh-CN-XiaoyiNeural',
          gender: 'female',
        },
        {
          value: 'zh-CN-XiaochenNeural',
          label: 'zh-CN-XiaochenNeural',
          gender: 'female',
        },
        {
          value: 'zh-CN-XiaochenMultilingualNeural',
          label: 'zh-CN-XiaochenMultilingualNeural',
          gender: 'female',
        },
        {
          value: 'zh-CN-XiaohanNeural',
          label: 'zh-CN-XiaohanNeural',
          gender: 'female',
        },
        {
          value: 'zh-CN-XiaomengNeural',
          label: 'zh-CN-XiaomengNeural',
          gender: 'female',
        },
        {
          value: 'zh-CN-XiaomoNeural',
          label: 'zh-CN-XiaomoNeural',
          gender: 'female',
        },
        {
          value: 'zh-CN-XiaoqiuNeural',
          label: 'zh-CN-XiaoqiuNeural',
          gender: 'female',
        },
        {
          value: 'zh-CN-XiaorouNeural',
          label: 'zh-CN-XiaorouNeural',
          gender: 'female',
        },
        {
          value: 'zh-CN-XiaoruiNeural',
          label: 'zh-CN-XiaoruiNeural',
          gender: 'female',
        },
        {
          value: 'zh-CN-XiaoshuangNeural',
          label: 'zh-CN-XiaoshuangNeural (Child)',
          gender: 'female',
        },
        {
          value: 'zh-CN-XiaoxiaoDialectsNeural',
          label: 'zh-CN-XiaoxiaoDialectsNeural',
          gender: 'female',
        },
        {
          value: 'zh-CN-XiaoxiaoMultilingualNeural',
          label: 'zh-CN-XiaoxiaoMultilingualNeural',
          gender: 'female',
        },
        {
          value: 'zh-CN-XiaoyanNeural',
          label: 'zh-CN-XiaoyanNeural',
          gender: 'female',
        },
        {
          value: 'zh-CN-XiaoyouNeural',
          label: 'zh-CN-XiaoyouNeural (Child)',
          gender: 'female',
        },
        {
          value: 'zh-CN-XiaoyuMultilingualNeural',
          label: 'zh-CN-XiaoyuMultilingualNeural',
          gender: 'female',
        },
        {
          value: 'zh-CN-XiaozhenNeural',
          label: 'zh-CN-XiaozhenNeural',
          gender: 'female',
        },
      ],
      male: [
        {
          value: 'zh-CN-YunxiNeural',
          label: 'zh-CN-YunxiNeural',
          gender: 'male',
        },
        {
          value: 'zh-CN-YunjianNeural',
          label: 'zh-CN-YunjianNeural',
          gender: 'male',
        },
        {
          value: 'zh-CN-YunyangNeural',
          label: 'zh-CN-YunyangNeural',
          gender: 'male',
        },
        {
          value: 'zh-CN-YunfengNeural',
          label: 'zh-CN-YunfengNeural',
          gender: 'male',
        },
        {
          value: 'zh-CN-YunhaoNeural',
          label: 'zh-CN-YunhaoNeural',
          gender: 'male',
        },
        {
          value: 'zh-CN-YunjieNeural',
          label: 'zh-CN-YunjieNeural',
          gender: 'male',
        },
        {
          value: 'zh-CN-YunxiaNeural',
          label: 'zh-CN-YunxiaNeural',
          gender: 'male',
        },
        {
          value: 'zh-CN-YunyeNeural',
          label: 'zh-CN-YunyeNeural',
          gender: 'male',
        },
        {
          value: 'zh-CN-YunyiMultilingualNeural',
          label: 'zh-CN-YunyiMultilingualNeural',
          gender: 'male',
        },
        {
          value: 'zh-CN-YunzeNeural',
          label: 'zh-CN-YunzeNeural',
          gender: 'male',
        },
        {
          value: 'zh-CN-YunfanMultilingualNeural',
          label: 'zh-CN-YunfanMultilingualNeural',
          gender: 'male',
        },
        {
          value: 'zh-CN-YunxiaoMultilingualNeural',
          label: 'zh-CN-YunxiaoMultilingualNeural',
          gender: 'male',
        },
      ],
    },
  },
};

function getLanguageCode(label, service) {
  for (const language of languageOptions[service]) {
    if (language.label === label) {
      return language.code;
    }
    return 'zh-HK';
  }
}

function getDefaultService() {
  return 'azure';
}

function getDefaultLanguage(service) {
  if (service == 'aws') {
    return 'zh';
  } else if (service == 'azure') {
    return 'zh';
  }
}

function getDefaultGender(service, language) {
  return genderOptions[service][language][0].value;
}

function getDefaultVoice(service, gender, language) {
  if (service == 'aws') {
    if (language == 'zh') {
      if (gender == 'female') {
        return 'Hiujin';
      } else {
        return null;
      }
    } else {
      if (gender == 'female') {
        return 'Zhiyu';
      } else {
        return null;
      }
    }
  } else if (service == 'azure') {
    if (language == 'zh') {
      if (gender == 'female') {
        return 'zh-HK-HiuMaanNeural';
      } else {
        return 'zh-HK-WanLungNeural';
      }
    } else {
      if (gender == 'female') {
        return 'zh-CN-XiaoxiaoNeural';
      } else {
        return 'zh-CN-YunxiNeural';
      }
    }
  } else {
    return voiceOptions[service][language][0].value;
  }
}

function getDefaultText() {
  return 'Hello World';
}

function getDefaultSsml(service, language, gender, voice) {
  if (service == 'aws') {
    return (
      // eslint-disable-next-line quotes
      "<speak><prosody rate='1.0'>Hello World</prosody></speak>"
    );
  } else if (service == 'azure') {
    return (
      // eslint-disable-next-line quotes
      "<speak version='1.0' xml:lang='" +
      getLanguageCode(language, service) +
      // eslint-disable-next-line quotes
      "'><voice xml:lang='" +
      getLanguageCode(language, service) +
      // eslint-disable-next-line quotes
      "' xml:gender='" +
      gender +
      // eslint-disable-next-line quotes
      "' name='" +
      voice +
      // eslint-disable-next-line quotes
      "'><prosody rate='1.0'>Hello World</prosody>" +
      '</voice></speak>'
    );
  } else {
    return 'Hello World';
  }
}

export {
  serviceOptions,
  languageOptions,
  voiceOptions,
  genderOptions,
  getDefaultService,
  getDefaultLanguage,
  getDefaultVoice,
  getDefaultText,
  getDefaultSsml,
  getLanguageCode,
  getDefaultGender,
};
