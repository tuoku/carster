import React from 'react';
import PropTypes from 'prop-types';
import {Button, Input} from 'react-native-elements';

const UploadForm = ({
  title,
  handleSubmit,
  handleInputChange,
  loading,
  inputs,
}) => {
  return (
    <>
      <Input
        autoCapitalize="none"
        placeholder="title"
        onChangeText={(txt) => handleInputChange('title', txt)}
        value={inputs.title}
      />
      <Input
        autoCapitalize="none"
        placeholder="description"
        multiline={true}
        onChangeText={(txt) => handleInputChange('description', txt)}
        value={inputs.description}
      />

      <Button raised title={title} onPress={handleSubmit} loading={loading} />
    </>
  );
};

UploadForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  inputs: PropTypes.object.isRequired,
};

export default UploadForm;
