import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { object, string } from "zod";

const schema = object({
  firstName: string().nonempty("First name is required"),
  lastName: string().nonempty("Last name is required"),
  email: string().email("Invalid email address").nonempty("Email is required"),
  mobile: string().nonempty("Mobile is required"),
  address: object({
    unitNumber: string().nullable(),
    streetNumber: string().nullable(),
    streetName: string().nullable(),
    suburb: string().nonempty("Suburb is required"),
    city: string().nullable(),
    postCode: string().nullable(),
  }),
});

const AddressForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address: {
        unitNumber: null,
        streetNumber: null,
        streetName: null,
        suburb: "",
        city: null,
        postCode: null,
      },
    },
    resolver: (data) => {
      return schema.validate(data, { abortEarly: false });
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            error={!!errors.firstName}
            helperText={errors?.firstName?.message}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Last Name"
            error={!!errors.lastName}
            helperText={errors?.lastName?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
        )}
      />
      <Controller
        name="mobile"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Mobile"
            error={!!errors.mobile}
            helperText={errors?.mobile?.message}
          />
        )}
      />
      <Controller
        name="address.unitNumber"
        control={control}
        render={({ field }) => <TextField {...field} label="Unit Number" />}
      />
      <Controller
        name="address.streetNumber"
        control={control}
        render={({ field }) => <TextField {...field} label="Street Number" />}
      />
      <Controller
        name="address.streetName"
        control={control}
        render={({ field }) => <TextField {...field} label="Street Name" />}
      />
      <Controller
        name="address.suburb"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Suburb"
            error={!!errors.address?.suburb}
            helperText={errors?.address?.suburb?.message}
          />
        )}
      />
      <Controller
        name="address.city"
        control={control}
        render={({ field }) => <TextField {...field} label="City" />}
      />
      <Controller
        name="address.postCode"
        control={control}
        render={({ field }) => <TextField {...field} label="Post Code" />}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default AddressForm;
