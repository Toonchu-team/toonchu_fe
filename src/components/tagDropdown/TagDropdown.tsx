"use client";

import React, { useEffect, useState } from "react";
import Tags from "../common/tag/Tags";
import Hangul from "hangul-js";
import clsx from "clsx";
import { X } from "lucide-react";

const TagDropdown = ({
  setOpenDropdown,
}: {
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // 임시 데이터
  const genres = ["장르", "소재", "분위기", "관계", "직업", "남캐", "기타"];
  const tags = [
    "오컬트판타지",
    "동양",
    "크리처",
    "스릴러",
    "현대물",
    "바보",
    "과거물",
    "2019_지상최대공모전",
    "DarkFantasy",
    "사극",
    "SF",
    "Cyberpunk",
    "Mystery",
    "Survival",
    "로맨스",
    "액션",
    "판타지",
    "TimeTravel",
    "Adventure",
    "Apocalypse",
    "네크로맨서",
    "천사와악마",
    "FutureWorld",
    "초능력",
    "Mythology",
    "MagicalRealism",
    "군대",
    "이세계전생",
    "Alien",
    "ParallelUniverse",
    "GhostHunter",
    "AI_Rebellion",
    "CyberWar",
    "RobotApocalypse",
    "Mutants",
    "RealityShow",
    "SecretSociety",
    "도박",
    "마법학교",
    "Vampire",
    "Steampunk",
    "Detective",
    "천재",
    "히어로",
    "Zombie",
    "LovecraftianHorror",
    "ParallelWorld",
    "DreamWorld",
    "무협",
    "Ninja",
    "전쟁물",
    "SpaceOpera",
    "ArtificialIntelligence",
    "Dystopia",
    "FantasyRomance",
    "Mecha",
    "MagicAcademy",
    "DarkHero",
    "TimeLoop",
    "UnderwaterCity",
    "MedievalFantasy",
    "CelestialKingdom",
    "DemonSlayer",
    "PsychicPower",
    "MonsterHunter",
    "CosmicHorror",
    "VirtualReality",
    "HighSchoolDrama",
    "PostApocalyptic",
    "SupernaturalMystery",
    "Reincarnation",
    "Espionage",
    "SecretAgent",
    "BioPunk",
    "Cyborg",
    "Nanotechnology",
    "Wuxia",
    "MartialArts",
    "SilentProtagonist",
    "VillainOrigin",
    "CrimeSyndicate",
    "AlienInvasion",
    "TimeTravelRomance",
    "PsychologicalThriller",
    "Harem",
    "ReverseHarem",
    "SliceOfLife",
    "WorkplaceDrama",
    "Pirates",
    "Shapeshifter",
    "Werewolf",
    "GothicFantasy",
    "Necropolis",
    "AngelsVsDemons",
    "DemonRealm",
    "LegendaryHero",
    "Summoner",
    "ArtifactHunter",
    "DungeonCrawler",
    "CardBattle",
    "TowerDefense",
    "CityBuilder",
    "MythicalCreatures",
    "Astrobiology",
    "SuperSoldier",
    "DetectiveNoir",
    "SpaghettiWestern",
    "UndeadKingdom",
    "Alchemy",
    "CyberDetective",
    "DreamExploration",
    "ShadowWorld",
    "SecretLab",
    "ArtificialGods",
    "LostCivilization",
    "LovecraftianMadness",
    "MythicalBeast",
    "CursedTreasure",
    "RuneMagic",
    "DigitalSorcery",
    "LivingWeapons",
    "GodComplex",
    "CorporateEspionage",
    "BodyHorror",
    "PuppetMaster",
    "Revolution",
    "HauntedMansion",
    "BountyHunter",
    "DimensionTravel",
    "AlienEmpire",
    "UndergroundFighter",
    "SupernaturalInvestigation",
    "OtherworldlyMarket",
    "CelestialWar",
    "LostPlanet",
    "TechnoWarfare",
    "DemonContract",
    "ResurrectedHero",
    "SentientAI",
    "MagicVsScience",
    "LivingDungeon",
    "DungeonEconomy",
    "FantasyKingdom",
    "RoyalIntrigue",
    "ParallelDimension",
    "DreamWars",
    "AstralProjection",
    "ApocalypticCult",
    "MythicalWarriors",
    "FaeKingdom",
    "ElementalPowers",
    "UndyingWarrior",
    "ImmortalCurse",
    "AncientProphecy",
    "GolemCrafting",
    "MonsterTamer",
    "ArtifactRebellion",
    "UrbanFantasy",
    "SupernaturalFactions",
    "MartialWorld",
    "Underworld",
    "CorruptGovernment",
    "SecretSociety",
    "DarkAcademia",
    "BioengineeredBeasts",
    "BeastTamer",
    "CyberSamurai",
    "MechaPilots",
    "ArtificialSoul",
    "PhantomThief",
    "LostTechnology",
    "DimensionHopping",
    "BloodMagic",
    "DemonicPossession",
    "MagicalHeist",
    "GothicRomance",
    "UndercoverAgent",
    "Transhumanism",
    "SpiritRealm",
    "Exorcism",
    "SecretArchives",
    "AlchemistGuild",
    "RoyalBloodline",
    "DemonKing",
    "LegendaryWeapons",
    "TimeAnomaly",
    "EldritchHorror",
    "Chronomancer",
    "CurseBreaker",
    "SupernaturalAcademy",
    "MysteriousRelic",
    "MythicQuest",
    "SpaceExplorers",
    "RogueAIs",
    "SpiritContract",
    "AncientDeity",
    "CyberOverlord",
    "MindControl",
    "PsychicAwakening",
    "RevengeStory",
    "ForbiddenKnowledge",
    "AlienEcosystem",
    "CelestialGuardians",
    "LostGalaxy",
    "DarkTournament",
    "DivineIntervention",
    "VoidWalker",
    "EtherealBeings",
    "ChaosMagic",
    "CloningExperiment",
    "SecretExperiment",
    "ViralOutbreak",
    "MonsterEvolution",
    "ParanormalDetective",
    "LivingCity",
    "IntergalacticPolitics",
    "HauntedIsland",
    "QuantumPhysics",
    "DarkSociety",
    "RealityBending",
    "AlternativeHistory",
    "AIUprising",
    "MythicalBeings",
    "MartialTournament",
    "MonsterCarnival",
    "UnderworldRuler",
    "ParallelUniverseSurvivor",
    "SupernaturalAuction",
    "GeneticMutation",
    "DragonTamer",
    "PsychicBattle",
    "PostHuman",
    "SinisterCorporation",
    "SkyCity",
    "CyberArena",
    "ShadowAssassin",
    "DreamReality",
    "ForbiddenAlchemy",
    "SpiritRebellion",
    "RealityGlitch",
    "MagicPolice",
    "Warlocks",
    "RogueMagician",
    "PhantomArmy",
    "BloodlineWar",
    "CosmicEntities",
    "TaintedBlood",
    "DemonHunter",
    "Technomagic",
    "OtherworldlyChampion",
    "DreamConstructs",
    "AncientWarriors",
    "ResurrectedEmpire",
    "CelestialProphecy",
    "VoidMagic",
    "VampireLord",
    "LostTemple",
    "CosmicConflict",
    "SupernaturalChampion",
    "ElementalMastery",
    "TimeDisruption",
    "MagicalUnderground",
    "GodSlayer",
    "Pandemonium",
    "EldritchEntities",
    "DystopianUnderworld",
    "FuturisticSamurai",
    "HeroAcademy",
    "HeavenVsHell",
    "Witchcraft",
    "MagicalConspiracy",
    "SacredBeasts",
    "EtherealWorld",
    "AlternateRealities",
  ];

  const [isVisible, setIsVisible] = useState(false); // 애니메이션 상태

  useEffect(() => {
    setIsVisible(true); // 컴포넌트가 마운트되면 애니메이션 실행
  }, []);

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const [selectedTags, setSelectedTags] = useState<string[]>([]); // 선택한 태그

  const [selectedPage, setSelectedPage] = useState<string>("ㄱ"); // 선택한 페이지
  const [pageTags, setPageTags] = useState<string[]>([]);

  const [selectedEng, setSelectedEng] = useState<boolean>(false);
  const paginationKor = [
    "ㄱ",
    "ㄴ",
    "ㄷ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅅ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
    "기타",
  ];
  const paginationEng = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "기타",
  ];

  // 확인용
  useEffect(() => {
    console.log(selectedTags);
  }, [selectedTags, setSelectedTags]);

  // 태그 클릭 핸들러
  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => {
      // 중복 태그 방지
      if (!prev.includes(tag)) {
        return [...prev, tag];
      } else {
        const returnArr = [...prev].filter((value) => value !== tag);
        return returnArr;
      }
    });
  };

  // 태그 분류 핸들러
  const filterByFirstLetter = (tags: string[], page: string) => {
    if (/^[ㄱ-ㅎ]$/.test(page)) {
      // 한글 초성 필터링
      return setPageTags(
        tags.filter((tag) => Hangul.disassemble(tag)[0] === page),
      );
    } else if (/^[A-Z]$/i.test(page)) {
      // 영어 필터링 (대소문자 무시)
      return setPageTags(
        tags.filter((tag) => tag.toUpperCase().startsWith(page.toUpperCase())),
      );
    } else if (page === "기타") {
      return setPageTags([]);
    }
  };

  return (
    <div
      className={clsx(
        "absolute top-0 z-50 flex h-[680px] w-full flex-col items-center justify-center gap-5 rounded-b-2xl bg-main-text bg-opacity-90 transition-all duration-500 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0",
      )}
    >
      <div className="relative flex w-[70%] justify-center">
        <p className="text-xl text-white">태그 선택</p>

        {/* 닫기 버튼 */}
        <X
          color="white"
          className="absolute right-0 top-0 cursor-pointer"
          onClick={() => {
            setOpenDropdown(false);
          }}
        />
      </div>

      <div className="flex w-[70%] flex-col items-center">
        {/* 선택한 태그 */}
        <div className="flex h-[100px] items-center justify-center px-10">
          <div className="flex h-[70px] flex-wrap items-center gap-3 overflow-y-auto">
            <button
              className="rounded-lg border border-main-grey bg-bg-yellow-02 px-2 py-1 text-main-text"
              onClick={() => {
                setSelectedTags([]);
              }}
            >
              선택한 태그 초기화
            </button>
            {selectedTags.map((selectedTag, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => handleTagClick(selectedTag)}
                  className="rounded-lg bg-white"
                >
                  <Tags tag={selectedTag} />
                </div>
              );
            })}
          </div>
        </div>

        <hr className="w-full" />

        {/* 장르 */}
        {/* 장르 선택 시 기본값 "ㄱ"으로 필터링 시작 */}
        <div className="flex h-[100px] items-center gap-6">
          {genres.map((genre, idx) => {
            return (
              <div key={idx}>
                <button
                  className={
                    selectedGenre == genre
                      ? "rounded-lg border-main-grey bg-bg-yellow-02 px-2 py-1 text-main-text"
                      : "text-white"
                  }
                  onClick={() => {
                    setSelectedGenre(genre);
                    filterByFirstLetter(tags, "ㄱ");
                  }}
                >
                  {genre}
                </button>
              </div>
            );
          })}
        </div>

        <hr className="w-full" />

        {/* 해당 태그 */}
        <div className="flex h-[230px] items-center px-10">
          <div className="flex h-[180px] flex-wrap items-center justify-center gap-3 overflow-y-auto">
            {pageTags.map((tag, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    handleTagClick(tag);
                  }} // 태그 클릭 핸들러 호출
                  className={`${
                    selectedTags.includes(tag)
                      ? "bg-bg-yellow-01 text-white"
                      : "bg-white text-black"
                  } h-[34px] rounded-lg`}
                >
                  <Tags tag={tag} />
                </div>
              );
            })}
          </div>
        </div>

        <hr className="w-full" />

        {/* 페이지네이션 */}
        <div className="relative flex h-[150px] w-full items-center justify-center gap-5 text-white">
          <button
            className="absolute left-3 rounded-lg border border-main-grey bg-bg-yellow-02 px-2 py-1 text-main-text"
            onClick={() => setSelectedEng((prev) => !prev)}
          >
            {selectedEng ? "한글" : "영어"}
          </button>
          {selectedEng ? (
            <div className="flex w-[80%] flex-wrap justify-center gap-4">
              {paginationEng.map((page, idx) => {
                return (
                  <div key={idx}>
                    <button
                      onClick={() => {
                        filterByFirstLetter(tags, page);
                        setSelectedPage(page);
                      }}
                      className={clsx(
                        `${selectedPage == page && "border border-main-yellow bg-bg-yellow-02 text-main-text"}`,
                        "rounded-full px-2 py-0.5",
                      )}
                    >
                      {page}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex w-[80%] flex-wrap justify-center gap-4">
              {paginationKor.map((page, idx) => {
                return (
                  <div key={idx}>
                    <button
                      onClick={() => {
                        filterByFirstLetter(tags, page);
                        setSelectedPage(page);
                      }}
                      className={clsx(
                        `${selectedPage == page && "border border-main-yellow bg-bg-yellow-02 text-main-text"}`,
                        "rounded-full px-1.5 py-0.5",
                      )}
                    >
                      {page}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagDropdown;
