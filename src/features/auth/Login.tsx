import React from 'react';
import {FormikHelpers, useFormik} from 'formik';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import {useActions, useAppDispatch} from 'common/hooks';
import {selectIsLoggedIn} from 'features/auth/auth.selectors';
import {authThunk} from 'features/auth/auth.reducer';
import {BaseResponseType} from 'common/types';


type FormErrorsType = {
    email?: string,
    password?: string,
    rememberMe?: boolean,
}

type FormValues = {
    email: string,
    password: string,
    rememberMe: boolean,
}

export const Login = () => {

   const {login} = useActions(authThunk)

    const isLoggedIn = useSelector(selectIsLoggedIn);

    const formik = useFormik({
        validate: (values) => {
            let errors: FormErrorsType = {}

            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Requires'
            } else if (values.password.length < 3) {
                errors.password = 'Length should be more 3 symbols'
            }

            return errors

        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: (values, formikHelpers: FormikHelpers<FormValues>) => {
            login(values)
                .unwrap()
                .catch((error: BaseResponseType) => {
                    error.fieldsErrors?.forEach(el => {
                        formikHelpers.setFieldError(el.field, el.error)
                    })
                    // formikHelpers.setFieldError(error.fieldsErrors[0].field, error.fieldsErrors[0].error)
                })
        },
    });

    const buttonDisabled = Object.entries(formik.errors).length !== 0 || Object.entries(formik.touched).length === 0


    if (isLoggedIn) {
        return <Navigate to={'/'}/>;
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered{' '}
                                <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p> Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
                            {formik.touched.email && formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                            <TextField type="password" label="Password"
                                       margin="normal" {...formik.getFieldProps('password')} />
                            {formik.touched.password && formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox {...formik.getFieldProps('rememberMe')}
                                                   checked={formik.values.rememberMe}/>}
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'} disabled={buttonDisabled}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};
