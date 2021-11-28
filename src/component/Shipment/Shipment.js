import './Shipment.css';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => {
        console.log(data);
    }

    console.log(watch("example")); 

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue={loggedInUser.name} {...register("name", { required: true })} />
      {errors.name && <span className="error">This field is required</span>}
     
      <input defaultValue={loggedInUser.email} {...register("email", { required: true })} />
      {errors.email && <span className="error">This field is required</span>}
     
      <input {...register("address", { required: true })} />
      {errors.address && <span className="error">This field is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;