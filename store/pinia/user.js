import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('');
    const address = ref(null);
    const userinfo = ref(null);
    const redirectInfo = ref(null);

    const addrDetail = computed(
      () =>
        address.value?.provinceName +
        address.value?.cityName +
        address.value?.countyName +
        address.value?.detailInfo
    );

    const updateAddress = (data) => {
      address.value = data;
    };

    const updateToken = (t) => {
      token.value = t;
    };

    const updateUserinfo = (info) => {
      userinfo.value = info;
    };
    const updateRedirectInfo = (info) => {
      redirectInfo.value = info;
    };
    return {
      token,
      updateToken,
      address,
      updateAddress,
      addrDetail,
      userinfo,
      updateUserinfo,
      redirectInfo,
      updateRedirectInfo,
    };
  },
  {
    persist: {
      key: 'user',
      paths: ['address', 'token', 'userinfo'],
      storage: {
        getItem(key) {
          return uni.getStorageSync(key);
        },
        setItem(key, value) {
          uni.setStorageSync(key, value);
        },
      },
      afterRestore(ctx) {},
    },
  }
);
