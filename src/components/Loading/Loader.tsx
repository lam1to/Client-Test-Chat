import cl from "./Loader.module.css";
import { FC } from "react";

export interface ILoaderProps {
  width: number;
  height: number;
}

const Loader: FC<ILoaderProps> = ({ width, height }) => {
  return (
    <div className={cl.loader_block}>
      <div style={{ width: width, height: height }} className={cl.loader}></div>
    </div>
  );
};

export default Loader;
