import React, { useState, useEffect } from "react";

// icones
import { FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs } from "react-icons/fa";

import { SiNextdotjs, SiTailwindcss } from "react-icons/si";

//  dados
const aboutData = [
  {
    title: "Skills",
    info: [
      {
        title: "Desenvolvimento web",
        icons: [
          <FaHtml5 key="html5" />,
          <FaCss3 key="css3" />,
          <FaJs key="js" />,
          <FaReact key="react" />,
          <SiNextdotjs key="next" />,
          <SiTailwindcss key="tailwind" />,
          <FaNodeJs key="node" />,
        ],
      },
    ],
  },
  {
    title: "Experiências",
    info: [
      {
        title: "Desenvolvedor front-end - Inclusive Pet",
        stage: "2022 - 2023",
      },
      {
        title: "Desenvolvedor freelancer",
        stage: "2021 - atualmente",
      },
    ],
  },
  {
    title: "Formação",
    info: [
      {
        title: "Engenharia de software - UPE",
        stage: "2022",
      },
    ],
  },
];

// componentes
import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";

// framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

import axios from "axios";

const About = () => {
    async function getLastFmInfo() {
      const apiKey = process.env.NEXT_PUBLIC_LASTFM_API_KEY;
      const username = process.env.NEXT_PUBLIC_LASTFM_USERNAME;

      try {
        // Faz a solicitação para a API do Last.fm
        const response = await axios.get(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json`
        );

        // Retorna os dados do último artista escutado
        return response.data.recenttracks.track[0];
      } catch (error) {
        console.error("Erro ao obter informações do Last.fm", error);
        return null;
      }
    }

    const [index, setIndex] = useState(0);
    const [lastFmData, setLastFmData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const data = await getLastFmInfo();
        setLastFmData(data);
      };

      fetchData();
    }, []);

  return (
    <div className="h-full bg-primary/60 py-32 text-center">
      <Circles />

      <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6">
        {/* texto */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2
            className="h2"
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            Olá, sou o{" "}
            <span className="text-accent">Lucas</span>
            👋
          </motion.h2>

          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-[560px] mx-auto xl:mx-0 mb-4 xl:mb-12 px-2 xl:px-0 text-justify"
          >
            Olá me chamo Lucas Cordeiro, Sou apaixonado por música e video games
            e amo um bom café ☕. Também sou um desenvolvedor web a cerca de 2 anos,
            atualmente sou estudante de engenharia de software pela Universidade
            de Pernambuco. Com amplo conhecimento em desenvolvimento web, desde
            JavaScript, React, Next.js, CSS, Tailwind, Node e diversas
            bibliotecas e frameworks e em CMS como o Wordpress. E espero que
            juntos possamos encontrar uma solução única para seu problema.
          </motion.p>

          <motion.div
            variants={fadeIn("right", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="relative flex-1"
          ></motion.div>
        </div>

        <div className="flex flex-col w-full xl:max-w-[48%] h-[480px]">
          <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4">
            {aboutData.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className={`${
                    index === itemIndex &&
                    "text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300"
                  } 
                  cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px]
                  after:bg-white after:absolute after:-bottom-1 after:left-0
                  `}
                  onClick={() => setIndex(itemIndex)}
                >
                  {item.title}
                </div>
              );
            })}
          </div>

          <div className="py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start">
            {aboutData[index].info.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className="flex-1 flex flex-col md:flex-row max-w-max gap-x-2 items-center text-white/60"
                >
                  {/* titulo */}
                  <div className="font-light mb-2 md:mb-0 ">{item.title}</div>

                  <div className="hidden md:flex">-</div>

                  <div className="">{item.stage}</div>

                  <div className="flex gap-x-4">
                    {/*icons*/}
                    {item.icons?.map((icon, itemIndex) => {
                      return (
                        <div className="text-2xl text-white" key={itemIndex}>
                          {icon}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* <div className="bg-orange-500/10 p-4 rounded-xl mb-2 w-[400px] h-[100px] mt-5 items-center justify-center flex">
              {lastFmData && (
                <>
                  <h1 className="text-sm font-bold">
                    No momento estou ouvindo{" "}
                    <span className="text-accent">{lastFmData.name}</span> do
                    artista{" "}
                    <span className="text-accent">
                      {lastFmData.artist["#text"]} 🎶
                    </span>
                  </h1>
                </>
              )}
            </div>
            <span className="text-[10px]">Sim, isso está acontecendo em tempo real graças a API do LastFM.</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
