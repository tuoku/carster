import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {doFetch} from '../utils/http';
import {appID, baseUrl} from '../utils/variables';

const useMedia = (ownFiles) => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const {update, user} = useContext(MainContext);

  useEffect(() => {
    // https://scriptverse.academy/tutorials/js-self-invoking-functions.html
    (async () => {
      try {
        const allMedia = await loadMedia();
        allMedia.reverse();
        setMediaArray(allMedia);
      } catch (e) {
        console.log('useMedia useEffect error', e.message);
      }
    })();
  }, [update]);

  const loadMedia = async () => {
    try {
      let mediaIlmanThumbnailia = await useTag().getFilesByTag(appID);

      if (ownFiles) {
        mediaIlmanThumbnailia = mediaIlmanThumbnailia.filter(
          (item) => item.user_id === user.user_id
        );
      }

      const kaikkiTiedot = mediaIlmanThumbnailia.map(async (media) => {
        return await loadSingleMedia(media.file_id);
      });
      return Promise.all(kaikkiTiedot);
    } catch (e) {
      console.log('loadMedia', e.message);
    }
  };

  const loadSingleMedia = async (id) => {
    try {
      const tiedosto = await doFetch(baseUrl + 'media/' + id);
      return tiedosto;
    } catch (e) {
      console.log('loadSingleMedia', e.message);
      return {};
    }
  };

  const uploadMedia = async (formData, token) => {
    try {
      setLoading(true);
      const options = {
        method: 'POST',
        headers: {
          'x-access-token': token,
        },
        body: formData,
      };
      const result = await doFetch(baseUrl + 'media', options);
      return result;
    } catch (e) {
      console.log('uploadMedia error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const modifyMedia = async (data, token, id) => {
    try {
      setLoading(true);
      const options = {
        method: 'PUT',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const result = await doFetch(baseUrl + 'media/' + id, options);
      return result;
    } catch (e) {
      console.log('modifyMedia error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (id, token) => {
    try {
      setLoading(true);
      const options = {
        method: 'DELETE',
        headers: {
          'x-access-token': token,
        },
      };
      const result = await doFetch(baseUrl + 'media/' + id, options);
      return result;
    } catch (e) {
      console.log('deleteMedia error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    mediaArray,
    loading,
    loadMedia,
    loadSingleMedia,
    uploadMedia,
    deleteMedia,
    modifyMedia,
  };
};

const useLogin = () => {
  const login = async (userCredentials) => {
    const requestOptions = {
      method: 'POST',
      // mode: 'no-cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userCredentials),
    };
    try {
      const loginResponse = await doFetch(baseUrl + 'login', requestOptions);
      return loginResponse;
    } catch (error) {
      console.log('login error', error.message);
    }
  };
  return {login};
};

const useUser = () => {
  const checkToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      const userInfo = await doFetch(baseUrl + 'users/user', options);
      return userInfo;
    } catch (error) {
      console.log('checkToken error', error);
    }
  };

  const getUserInfo = async (userid, token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      const userInfo = await doFetch(baseUrl + 'users/' + userid, options);
      return userInfo;
    } catch (error) {
      console.log('checkToken error', error);
    }
  };

  const checkUsernameAvailable = async (username) => {
    try {
      const usernameInfo = await doFetch(
        baseUrl + 'users/username/' + username
      );
      return usernameInfo.available;
    } catch (error) {
      console.log('checkUsername error', error);
    }
  };

  const register = async (userCredentials) => {
    // https://media.mw.metropolia.fi/wbma/docs/#api-User-PostUser
    const requestOptions = {
      method: 'POST',
      // mode: 'no-cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userCredentials),
    };
    try {
      const registerResponse = await doFetch(baseUrl + 'users', requestOptions);
      return registerResponse;
    } catch (error) {
      console.log('register error', error.message);
    }
  };

  return {checkToken, getUserInfo, register, checkUsernameAvailable};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      const tiedosto = await doFetch(baseUrl + 'tags/' + tag);
      return tiedosto;
    } catch (e) {
      console.log('getFilesByTag', e.message);
      return {};
    }
  };

  // eslint-disable-next-line camelcase
  const addTag = async (file_id, tag, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file_id, tag}),
    };
    // console.log('optiot', options);
    try {
      const tagInfo = await doFetch(baseUrl + 'tags', options);
      return tagInfo;
    } catch (error) {
      // console.log('addTag error', error);
      throw new Error(error.message);
    }
  };

  return {getFilesByTag, addTag};
};

const useFavourites = () => {
  const addFavourite = async (fileId, token) => {
    // post /favourites
  };

  const deleteFavourite = async (fileId, token) => {
    // DELETE /favourites/file/:id
  };

  const getFavouritesByFileId = async (fileId) => {
    // get /favourites/file/:id
  };

  const getMyFavourites = (token) => {
    // GET /favourites
  };

  return {
    addFavourite,
    deleteFavourite,
    getFavouritesByFileId,
    getMyFavourites,
  };
};

export {useMedia, useLogin, useUser, useTag, useFavourites};