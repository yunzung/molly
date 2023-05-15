import React, { useEffect, useState } from 'react';
import styles from '../../css/Dday.module.css';
import AddVaccine from '../../pages/AddVaccine';

const Dday = (props) => {
  const bgColor = ["#DCCFC2", "#C9DEEA", "#CFDBCA"];
  const textColor = ["#867D74", "#6A828F", "#778572"];
  const today = new Date();

  return (
    <div>
      {props.pet.map((item, index) => {
        return (
          <DdayList
            save = {props.save}
            setSave = {props.setSave}
            petId={item.petId}
            icon={item.petType === "DOG" ? "🐶" : "CAT" ? "🐱" : "🐰"}
            name={item.petName}
            vaccine={item.vaccinePredict.map((item) => {
              return (item.vaccinationName);
            })}
            day={item.vaccinePredict.map((item) => {
              const dday = new Date(`${item.vaccinationDate} 00:00:00`);
              const gapNum = dday - today;
              const day = Math.ceil(Math.ceil(gapNum / (1000 * 60 * 60 * 24)));
              return (day)
            })}
            color={bgColor[index]}
            textColor={textColor[index]} />)
      })}
    </div>
  );
};

const DdayList = (props) => {
  const [modal, setModal] = useState(false);
  const [vaccineName, setVaccineName] = useState("");

  const handleClick = () => {
    setModal(!modal);
  }

  return (
    <div style={{ width: "350px", marginBottom: "40px" }}>
      <div className={styles.petinfo}>
        <span className={styles.name}>{props.icon} {props.name}</span>
      </div>
      {props.vaccine.map((item, index) => {
        return (
          index < 2 ? 
          <div onClick={() => { 
              handleClick();
              setVaccineName(props.vaccine[index]);
            }} className={styles.list} style={{ backgroundColor: props.color }}>
            <span className={styles.vaccine} style={{ color: props.textColor }}>{props.vaccine[index]}</span>
            <span className={styles.day}>
              D{props.day[index] >= 0 ? '-' : '+'}
              {props.day[index] === 0 ? 'day' : Math.abs(props.day[index])}
            </span>
          </div> : null
        )
      })}
      {modal && <AddVaccine onClick={handleClick} vaccineName={vaccineName} petId={props.petId} save={props.save} setSave={props.setSave}/>}
    </div>
  )
}

export default Dday;