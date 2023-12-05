import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import {selectIsLoggedIn} from 'features/auth/model/authSelectors';
import s from 'features/auth/ui/login/login.module.css';
import {useLogin} from 'features/auth/lib/useLogin';
import {AppRootStateType} from 'app/store';


export const Login = () => {

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isCaptchaUrl = useSelector<AppRootStateType, string | null>(state => state.auth.captchaUrl);
  const formik = useLogin()

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered{" "}
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel="noreferrer">
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p> Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email && <p className={s.error}>{formik.errors.email}</p>}
              <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
              {formik.touched.password && formik.errors.password && <p className={s.error}>{formik.errors.password}</p>}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
              />
              {isCaptchaUrl && <img src={isCaptchaUrl}/>}
              {isCaptchaUrl && <TextField type="Captcha" label="captcha" margin="normal" {...formik.getFieldProps("captcha")} />}
              {formik.touched.captcha && formik.errors.captcha && <p className={s.error}>{formik.errors.captcha}</p>}

              <Button
                type={"submit"}
                variant={"contained"}
                disabled={!(formik.isValid && formik.dirty)}
                color={"primary"}
              >
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
