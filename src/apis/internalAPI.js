import { API } from 'aws-amplify';

export const getAllSuppliers = async () => {
  return await API.get('Internal-API', 'suppliers');
};

export const getSupplierById = async (id) => {
  return await API.get('Internal-API', 'suppliers', {
    queryStringParameters: {
      id,
    },
  });
};

export const getMaterialsBySupplier = async (supplier) => {
  return await API.get('Internal-API', 'materials', {
    queryStringParameters: {
      supplier,
    },
  });
};

export const getMaterialById = async (id) => {
  return await API.get('Internal-API', 'materials', {
    queryStringParameters: {
      id,
    },
  });
};

export const getCustomersByBuilder = async (builder) => {
  return await API.get('Internal-API', 'customers', {
    queryStringParameters: {
      builder,
    },
  });
};

export const getCustomerById = async (id) => {
  return await API.get('Internal-API', 'customers', {
    queryStringParameters: {
      id,
    },
  });
};

export const createCustomer = async (builder, customerData) => {
  return await API.post('Internal-API', 'customers', {
    body: {
      ...customerData,
      builder,
    },
  });
};
