import Image from "next/image";
import styles from "./loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.loaderRoot}>
      <div className={styles.container}>
        <div className={styles.track}>
          <div className={styles.pikachuWrapper}>
            <Image
              src="/pikachu-running.gif"
              alt=""
              width={48}
              height={48}
              unoptimized
              priority
              className={styles.pikachu}
            />
          </div>

          <div className={styles.dots}>
            {["d1", "d2", "d3", "d4", "d5"].map((id) => (
              <div key={id} className={styles.dot} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
