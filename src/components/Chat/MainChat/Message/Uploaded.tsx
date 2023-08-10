import { motion } from "framer-motion";
import React from "react";
import st from "../../../../styles/message.module.css";
import done from "../../../../public/check.png";

const Uploaded = () => {
  return (
    <motion.div
      className={st.uploaded}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <img src={done} alt="" />
    </motion.div>
  );
};

export default Uploaded;
