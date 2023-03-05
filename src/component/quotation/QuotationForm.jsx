import React, { useState, useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { toast } from 'react-toastify';
import { useForm, useController } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { zodResolver } from '@hookform/resolvers/zod';
import { enum as zodEnum, number, object, string, boolean } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { cacheOrder } from '../../redux/slices/orderSlice';
import ButtonSection from './ButtonSection';

const schema = object({
  fName: string().min(2, 'Please enter a valid first name').max(32, 'First name must be less than 100 characters'),
  lName: string().min(2, 'Please enter a valid first name').max(32, 'First name must be less than 100 characters'),
  email: string().email(),
  mobile: string().startsWith('04', "Mobile number should start with '04'").min(10).max(14),
  companyName: string().optional(),
  ABN: string().optional(),
  address: object({
    unitNo: string().optional(),
    streetNo: string().optional(),
    streetName: string().optional(),
    suburb: string().min(2, 'Please enter a suburb'),
    city: string().optional(),
    state: string().optional(),
    postCode: string().optional(),
    country: string().optional(),
  }).optional(),
  requestInstall: zodEnum(['yes', 'no']).nullable().optional(),
  isUpstairs: zodEnum(['yes', 'no']).nullable().optional(),
  floors: string().min(1, 'Please valid number').optional(),
  specialCondition: string().optional(),
  supplier: zodEnum(['Lavi Stone', 'B', 'C', 'D']),
});

function QuotationForm({ handleNext, handleBack, activeStep }) {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.order);
  const {
    register,
    control,
    unregister,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...order },
    resolver: zodResolver(schema),
  });

  const [requestInstall, setRequestInstall] = useState(order.requestInstall ?? 'no');
  const [isUpstairs, setIsUpstairs] = useState(order.isUpstairs ?? 'no');
  const [supplier, setSupplier] = useState(order.supplier ?? 'Lavi Stone');

  const { field } = useController({ name: 'supplier', control });

  const supplierSet = ['Lavi Stone', 'B', 'C', 'D'];
  const unregisterKeys = ['address', 'isUpstairs', 'supplier', 'floors'];

  //unregister unused keys when load from previous page
  useEffect(() => {
    console.log('errors', errors);
    console.log('install', requestInstall);
    console.log('isUpstairs', isUpstairs);
    console.log('supplier', supplier);
    if (order?.requestInstall === 'no') {
      unregister(unregisterKeys);
      setIsUpstairs('no');
      setRequestInstall('no');
    }
  }, [order, errors]);

  const handleSelectChange = (option) => {
    setSupplier(option.target.value);
    field.onChange(option.target.value);
  };

  const onSubmit = (data) => {
    console.log(12345, data);
    dispatch(cacheOrder(data));
    handleNext();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* CUSTOMER DETAIL */}
        <Typography variant="h5" gutterBottom>
          Customer Detail
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('fName', { required: true })}
              label="First name"
              fullWidth
              autoComplete="first name"
              error={!!errors.fName}
              helperText={errors.fName?.message ?? null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('lName', { required: true })}
              label="Last name"
              fullWidth
              autoComplete="last name"
              error={!!errors.lName}
              helperText={errors.lName?.message ?? null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('mobile', { required: true })}
              label="Mobile"
              fullWidth
              autoComplete="mobile"
              error={!!errors.mobile}
              helperText={errors.mobile?.message ?? null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('email', { required: true })}
              label="Email"
              fullWidth
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email?.message ?? null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('companyName')}
              label="Company Name"
              fullWidth
              autoComplete="company"
              error={!!errors.companyName}
              helperText={errors.companyName?.message ?? null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('ABN')}
              label="ABN/ARN"
              fullWidth
              autoComplete="ABN"
              error={!!errors.ABN}
              helperText={errors.ABN?.message ?? null}
            />
          </Grid>
        </Grid>

        {/* INSTALLATION DETAIL */}
        <Typography variant="h5" gutterBottom mt={4}>
          Installation Detial
        </Typography>
        {/* <FormControl>
          <FormLabel>Request for Install</FormLabel>
          <Controller
            name="requestInstall"
            control={control}
            render={({ field }) => {
              return (
                <RadioGroup
                  value={field.value}
                  onChange={field.onChange}
                  ref={requestInstallRef}
                >
                  <FormControlLabel
                    value="yes"
                    label="yes"
                    control={<Radio />}
                  />
                  <FormControlLabel value="no" label="no" control={<Radio />} />
                </RadioGroup>
              );
            }}
          />
        </FormControl> */}
        <FormControl>
          <FormLabel>Request for Installation</FormLabel>
          <RadioGroup
            row
            value={requestInstall}
            {...register('requestInstall')}
            onChange={(e) => {
              console.log(e);
              unregister(unregisterKeys);
              setRequestInstall(e.target.value);
            }}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        {requestInstall === 'yes' ? (
          <>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Installation Address
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  // type="number"
                  {...register('address.unitNo', { required: true })}
                  label="Unit#"
                  fullWidth
                  autoComplete="Install unit number"
                  error={!!errors?.address?.unitNo}
                  helperText={errors?.address?.unitNo?.message ?? null}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  // type="number"
                  {...register('address.streetNo')}
                  label="Street#"
                  fullWidth
                  autoComplete="Install street number"
                  error={!!errors?.address?.streetNo}
                  helperText={errors?.address?.streetNo?.message ?? null}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  {...register('address.streetName')}
                  label="Street name"
                  fullWidth
                  autoComplete="Install street name"
                  error={!!errors?.address?.streetName}
                  helperText={errors?.address?.streetName?.message ?? null}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  {...register('address.suburb', {
                    required: true,
                  })}
                  label="Suburb"
                  fullWidth
                  autoComplete="Install suburb"
                  error={!!errors?.address?.suburb}
                  helperText={errors?.address?.suburb?.message ?? null}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('address.city')}
                  label="City"
                  fullWidth
                  autoComplete="Install city"
                  error={!!errors?.address?.city}
                  helperText={errors?.address?.city?.message ?? null}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('address.state')}
                  label="State/Province/Region"
                  autoComplete="Install state"
                  fullWidth
                  error={!!errors?.address?.state}
                  helperText={errors?.address?.state?.message ?? null}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  // type="number"
                  {...register('address.postCode')}
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="Install postal-code"
                  error={!!errors?.address?.postCode}
                  helperText={errors?.address?.postCode?.message ?? null}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('address.country')}
                  label="Country"
                  fullWidth
                  autoComplete="Install country"
                  error={!!errors?.address?.country}
                  helperText={errors?.address?.country?.message ?? null}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={2}>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel>Upstairs ? </FormLabel>
                  <RadioGroup
                    row
                    value={isUpstairs}
                    {...register('isUpstairs')}
                    onChange={(e) => {
                      unregister('floors');
                      setIsUpstairs(e.target.value);
                    }}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {isUpstairs === 'yes' ? (
                <>
                  <Grid item xs={12}>
                    <TextField
                      id="floorNo"
                      {...register('floors')}
                      label="How many floors"
                      error={!!errors.floors}
                      helperText={errors.floors?.message ?? null}
                    />
                  </Grid>
                </>
              ) : (
                <></>
              )}
            </Grid>
          </>
        ) : (
          <></>
        )}
        <Grid item xs={12} mt={2}>
          <FormControl fullWidth>
            <FormLabel mb={2}>Supplier </FormLabel>
            <Select
              {...register('supplier', { required: true })}
              value={supplier}
              // value={field.value}
              label="Supplier"
              onChange={handleSelectChange}
              error={!!errors.supplier}
              helperText={errors.supplier?.message ?? null}
            >
              {supplierSet.map((supplier) => {
                return (
                  <MenuItem key={supplier} value={supplier}>
                    {supplier}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Typography variant="h6" gutterBottom mt={4}>
          Special Conditions
        </Typography>
        <Grid item xs={12} sm={12} mt={2}>
          <TextField
            {...register('specialCondition')}
            label="Writing anything you want..."
            fullWidth
            multiline
            minRows={4}
            autoComplete="Please write something..."
            error={!!errors.specialCondition}
            helperText={errors.specialCondition?.message ?? null}
          />
        </Grid>
        <ButtonSection handleBack={handleBack} handleNext={handleNext} handleSaveForm={true} activeStep={activeStep} />
      </form>
    </Box>
  );
}

export default QuotationForm;
