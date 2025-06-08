import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import QuizModal from "@/components/QuizModal";
import { toast } from "sonner";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  bear,
  coin,
  highVoltage,
  rocket,
  trophy,
  skeleton,
  heart,
  skeleton2,
  skeleton3,
  skeleton4,
  skeleton5,
  skeleton6,
  skeleton7,
  skeleton8,
  background2,
} from "../images";
import { back3 } from "../images";
import { useAuth } from "../context/AuthContent";
import Navbar from "@/components/Navbar";

const VictoryModal = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg text-center">
      <h2 className="text-xl font-bold mb-4">Victory!</h2>
      <p className="mb-4">You defeated the enemy and earned 3000 petals!</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={onClose}
      >
        Claim Reward
      </button>
    </div>
  </div>
);
const Tapping = () => {
  const [petals, setPetals] = useState(1000);
  const [boostLevel, setBoostLevel] = useState(0);
  const [boostPrice, setBoostPrice] = useState(1000);
  const [health, setHealth] = useState(1000000);
  const [maxHealth, setMaxHealth] = useState(1000000);
  const [energy, setEnergy] = useState(2000);
  const [maxEnergy, setMaxEnergy] = useState(2000);
  const [energyUpgradePrice, setEnergyUpgradePrice] = useState(1000);
  const [tapPosition, setTapPosition] = useState(null);
  const [increments, setIncrements] = useState([]);
  const [isPlanActive, setIsPlanActive] = useState(
    localStorage.getItem("isPlanActive")
  );
  const [tapEffect, setTapEffect] = useState(false);
  const [completedQuests, setCompletedQuests] = useState([]);
  const [clicks, setClicks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [dailyLoginData, setDailyLoginData] = useState({
    currentDay: 0,
    lastLogin: null,
    rewardsClaimed: [],
  });
  const [currentImage, setImage] = useState(skeleton); // Initial image
  const [showVictoryModal, setShowVictoryModal] = useState(false); // New state for modal
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [cooldownEndTime, setCooldownEndTime] = useState(null);

  const { currentUser } = useAuth();
  const imagesArray = [
    skeleton,
    skeleton2,
    skeleton3,
    skeleton4,
    skeleton5,
    skeleton6,
    skeleton7,
    skeleton8,
  ];
  const [uid, setUid] = useState(
    localStorage.getItem("uid") || currentUser.uid
  );

  useEffect(() => {
    // Attempt to retrieve the Telegram username
    const initializeUser = async () => {
      let username;

      try {
        username = currentUser.username;
      } catch (error) {
        console.log("Telegram username not available:", error);
      }

      const finalUid = currentUser.uid;
      setUid(finalUid);
      localStorage.setItem("uid", finalUid);
      await loadUserData(finalUid);
    };

    initializeUser();
  }, [uid]);

  useEffect(() => {
    const storedPlanActive = localStorage.getItem("isPlanActive");
    if (storedPlanActive === "true") {
      setIsPlanActive(true);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (energy < maxEnergy && health < maxHealth && !isPlanActive) {
        console.log(isPlanActive);
        setHealth((prev) => Math.min(prev + 1, maxHealth));
        setEnergy((prev) => Math.max(prev - 1, 0));
        updateDoc(doc(db, "users", uid), {
          health: Math.min(health + 1, maxHealth),
          energy: Math.max(energy - 1, 0),
        });
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [energy, health, maxEnergy, maxHealth, uid]);

  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        setPetals(userData.petals ?? 1000); // Fallback default
        setBoostLevel(userData.boostLevel ?? 0);
        setBoostPrice(userData.boostPrice ?? 1000);
        setHealth(userData.health ?? 1000000);
        setMaxHealth(userData.maxHealth ?? 1000000);
        setEnergy(userData.energy ?? 2000);
        setMaxEnergy(userData.maxEnergy ?? 2000);
        setEnergyUpgradePrice(userData.energyUpgradePrice ?? 1000);
        setCompletedQuests(userData.completedQuests || []);
        setDailyLoginData(
          userData.dailyLoginData || {
            currentDay: 0,
            lastLogin: null,
            rewardsClaimed: [],
          }
        );
      } else {
        // New user default data
        const defaultData = {
          petals: 1000,
          boostLevel: 0,
          boostPrice: 1000,
          health: 1000000,
          maxHealth: 1000000,
          energy: 2000,
          maxEnergy: 2000,
          energyUpgradePrice: 1000,
          invitedUsers: [],
          completedQuests: [],
          dailyLoginData: {
            currentDay: 0,
            lastLogin: null,
            rewardsClaimed: [],
          },
        };
        await setDoc(userRef, defaultData);
        Object.entries(defaultData).forEach(([key, value]) => {
          if (key === "dailyLoginData") return;
          if (typeof value === "number")
            eval(`set${key.charAt(0).toUpperCase() + key.slice(1)}(${value})`);
        });
        setDailyLoginData(defaultData.dailyLoginData);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const now = Date.now();

    // Trigger quiz if energy hits half
    if (energy === maxEnergy / 2 && !quizAnswered && !showQuizModal) {
      setShowQuizModal(true);
    }

    // If cooldown is active, check expiration
    if (cooldownEndTime && now >= cooldownEndTime) {
      setQuizAnswered(false);
      setQuizPassed(false);
      setCooldownEndTime(null);
      setEnergy(maxEnergy); // Refill energy
    }
  }, [energy, maxEnergy, quizAnswered, showQuizModal, cooldownEndTime]);

  const handleTap = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (loading || energy <= 0) return;
    if (loading || energy <= 0 || (quizAnswered && !quizPassed)) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Relative x position
    const y = e.clientY - rect.top; // Relative y position
    const imageElement = e.currentTarget.querySelector("img");

    if (imageElement) {
      imageElement.classList.add("vibrate");

      // Remove the class after the animation ends
      setTimeout(() => {
        imageElement.classList.remove("vibrate");
      }, 300); // Match the duration of the animation (0.3s)
    }

    // card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    // setTimeout(() => {
    //   card.style.transform = '';
    // }, 100);

    const incrementValue = 1 + boostLevel;
    const newPetals = petals + incrementValue;
    const newHealth = Math.max(health - incrementValue, 0);
    const newEnergy = Math.max(energy - incrementValue, 0);

    setPetals(newPetals);
    setHealth(newHealth);
    setEnergy(newEnergy);
    setClicks([...clicks, { id: Date.now(), x, y, value: incrementValue }]);
    if (!isNaN(newPetals) && !isNaN(newHealth) && !isNaN(newEnergy)) {
      await updateDoc(doc(db, "users", uid), {
        petals: newPetals,
        health: newHealth,
        energy: newEnergy,
      });
    }

    await updateDoc(doc(db, "users", uid), {
      petals: newPetals,
      health: newHealth,
      energy: newEnergy,
    });

    if (newHealth === 0) {
      const nextMaxHealth = maxHealth + 1000000;
      setMaxHealth(nextMaxHealth);
      setShowVictoryModal(true);
      setHealth(nextMaxHealth);
      await updateDoc(doc(db, "users", uid), {
        maxHealth: nextMaxHealth,
        health: nextMaxHealth,
      });
      // Update the image based on the new maxHealth
      const index = nextMaxHealth / 1000000 - 1;
      if (index >= 0 && index < imagesArray.length) {
        setImage(imagesArray[index]);
      }
    }
  };

  const handleQuizPass = () => {
    setQuizPassed(true);
    setQuizAnswered(true);
    setShowQuizModal(false);
    toast("You have successfully passed the quiz, you may continue");
  };

  const handleQuizFail = () => {
    setQuizPassed(false);
    setQuizAnswered(true);
    setShowQuizModal(false);
    toast("You didnt answer the quiz, you have to wait for 12 hrs...");
    const nextRefill = Date.now() + 12 * 60 * 60 * 1000;
    setCooldownEndTime(nextRefill);
    // Optionally store cooldown in localStorage or Firestore
  };

  useEffect(() => {
    if (increments.length > 0) {
      const timer = setTimeout(() => {
        setIncrements(
          increments.filter((increment) => Date.now() - increment.id < 1000)
        );
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [increments]);

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  const closeVictoryModal = () => {
    setShowVictoryModal(false);
  };

  return (
    <div className="flex flex-col">
        <Navbar />
        <div
      className="min-h-screen px-4 pt-4 flex flex-col items-center text-white font-medium"
      style={{
        backgroundImage: `url(${back3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh", // Ensures it takes the full viewport height
      }}
    >
      <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
        <div className="mt-25 text-5xl font-bold flex items-center">
          <img src={coin} width={44} height={44} />
          <span className="ml-2" id="petalCount">
            {petals.toLocaleString()}
          </span>
        </div>
        <div className="text-base mt-2 flex items-center">
          <img src={trophy} width={24} height={24} />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
        <div className="w-full flex justify-between gap-2">
          <div className="flex items-center justify-center divforfriends">
            <img src={heart} width={44} height={44} alt="High Voltage" />
            <div className="ml-2 text-left">
              <span className="text-white text-2xl font-bold block">
                {health}
              </span>
              <span className="text-white text-large opacity-75">
                / {maxHealth}
              </span>
            </div>
          </div>
          <div className="w-1/3 flex items-center justify-start max-w-32">
            <div className="flex items-center justify-center divforfriends">
              <img
                src={highVoltage}
                width={44}
                height={44}
                alt="High Voltage"
              />
              <div className="ml-2 text-left">
                <span className="text-white text-2xl font-bold block">
                  {energy}
                </span>
                <span className="text-white text-large opacity-75">
                  / {maxEnergy}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="progress-container sm:order-1">
          <div
            className="progress-bar"
            style={{ width: `${(energy / maxEnergy) * 100}%` }}
          ></div>
        </div>
      </div>
      {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Petal Tap Game</h1>
        <p className="text-xl mb-4">Petals: <span id="petalCount">{petals}</span></p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
          onClick={handleTap}
        >
          Tap
        </button>
        <p className="text-xl mb-4">Boost Level: <span id="boostLevel">{boostLevel}</span></p>
        <p className="text-xl mb-4">Boost Price: <span id="boostPrice">{boostPrice}</span></p>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded mb-4"
          onClick={handleBoost}
        >
          Buy Boost
        </button>
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded mb-4"
          onClick={handleEnergyUpgrade}
        >
          Upgrade Energy
        </button>
        <p className="text-xl mb-4">Health: <span id="health">{health}</span>/{maxHealth}</p>
        <p className="text-xl mb-4">Energy: <span id="energy">{energy}</span>/{maxEnergy}</p>
        <p className="text-xl mb-4">Energy Upgrade Price: <span id="energyUpgradePrice">{energyUpgradePrice}</span></p>
      </div> */}
      <div className="flex-grow flex items-center justify-center">
        <div className="relative mt-20 tap-animation" onClick={handleTap}>
          <img
            src={currentImage}
            width={300}
            height={300}
            alt="landoftheforgotten"
            className="flex-wrap "
          />
          {clicks.map((click) => (
            <div
              key={click.id}
              className="absolute text-5xl font-bold opacity-100 text-white pointer-events-none increment"
              style={{
                top: `${click.y}px`,
                left: `${click.x}px`,
                transform: "translate(-50%, -50%)",
                animation: "float 1s ease-out",
              }}
              // onAnimationEnd={() => handleAnimationEnd(click.id)}
              onAnimationEnd={() => handleAnimationEnd(click.id)}
            >
              +{click.value}
            </div>
          ))}
        </div>
      </div>

      {showVictoryModal && <VictoryModal onClose={closeVictoryModal} />}
      {showQuizModal && (
        <QuizModal
          onClose={() => setShowQuizModal(false)}
          onPass={handleQuizPass}
          onFail={handleQuizFail}
        />
      )}
    </div>
    </div>
  );
};

export default Tapping;
