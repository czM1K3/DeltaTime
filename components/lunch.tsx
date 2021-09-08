import React, { FC, useState } from "react";
import { GiKnifeFork } from 'react-icons/gi';
import { IoMdCloseCircle } from 'react-icons/io';
import Modal from "react-modal";
import { IndexQuery } from "../lib/graphql/index.graphql";
import styles from "../styles/Home.module.scss";

type LunchProps = {
	lunch: IndexQuery["lunch"];
};

const Lunch: FC<LunchProps> = ({ lunch }) => {
	const [show, setShow] = useState(false);

	return (
		<>
			<GiKnifeFork onClick={() => setShow(true)} className={styles.dishes} />
			<Modal
				isOpen={show}
				onRequestClose={() => setShow(false)}
				contentLabel="Oběd"
				style={{overlay: { backgroundColor: "rgba(128, 128, 128, 0.5)" }, content: { padding: 0, border: "none" }}}
			>
				<div className={styles.modal}>
					<IoMdCloseCircle onClick={() => setShow(false)} className={styles.close} />
					<h1>Dašácké menu</h1>
					<h2>Polévka: <p>{lunch.soup}</p></h2>
					<h2>Oběd 1: <p>{lunch.lunch1}</p></h2>
					<h2>Oběd 2: <p>{lunch.lunch2}</p></h2>
					<h2>Oběd 3: <p>{lunch.lunch3}</p></h2>
					<h2>Příloha: <p>{lunch.extra}</p></h2>
				</div>
			</Modal>
		</>
	);
};

export default Lunch;
