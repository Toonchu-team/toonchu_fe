// components/FootprintAnimation.tsx
"use client";

import React from "react";
import styles from "./FootprintAnimation.module.scss";
import Image from "next/image";

interface Offset {
  x: number;
  y: number;
}

// 발자국이 찍힐 오프셋 배열 (중심에서 시작해 지그재그 패턴)
const offsets: Offset[] = [
  { x: -60, y: 60 },
  { x: 10, y: -10 },
  { x: -30, y: -80 },
  { x: 100, y: -130 },
];

const FootprintAnimation: React.FC = () => {
  return (
    <div className={`hidden md:block ${styles.container}`}>
      {offsets.map((offset, idx) => (
        <div
          key={idx}
          className={styles.footprint}
          style={{
            transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) rotate(20deg)`,
            animationDelay: `${idx * 0.5}s`,
          }}
        >
          <Image
            src="/images/brand-character/paw.png"
            width={50}
            height={50}
            alt="paw"
          />
        </div>
      ))}
    </div>
  );
};

export default FootprintAnimation;
