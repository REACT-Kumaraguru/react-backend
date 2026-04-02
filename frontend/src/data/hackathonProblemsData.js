// Hackathon Problem Compendium Data
// 5 Themes × 10 Problems each

const hackathonThemes = [
  // ============================================
  // THEME 1: Climate Resilience and Water Security Systems
  // ============================================
  {
    id: 1,
    name: "Climate Resilience & Water Security Systems",
    shortName: "Climate Resilience",
    icon: "🌊",
    tagline: "Coimbatore-Anchored · Hardware-First · Deep-Tech · Patent-Oriented · Nationally Scalable",
    problems: [
      {
        id: 101,
        title: "Real-Time Groundwater Depletion Rate Measurement at Individual Borewell Level",
        context: "Coimbatore district is heavily groundwater dependent. Pollachi, Annur, and Kinathukadavu blocks show declining borewell yield. Farmers know water levels are dropping but cannot quantify extraction rate vs recharge rate. Current measurement is manual rope-and-weight depth checking.",
        nationalContext: "India extracts the highest volume of groundwater globally. Atal Bhujal Yojana monitors aquifers at block level, not individual borewell level.",
        engineeringGap: "No affordable device exists that: continuously measures dynamic water column level during pumping; separates static water level vs drawdown vs recovery rate; operates inside 150–300 ft borewells; survives high TDS and pump vibration; costs below Rs. 10,000. Individual borewell depletion intelligence is absent at farmer scale.",
        policy: ["Atal Bhujal Yojana", "CGWB Groundwater Reports"]
      },
      {
        id: 102,
        title: "Real-Time Aquifer Recharge Quantification After Rainfall Events",
        context: "Western Ghats runoff flows into Coimbatore plains, but recharge impact on specific agricultural zones is unknown.",
        nationalContext: "India builds recharge pits and check dams without measuring actual recharge efficiency.",
        engineeringGap: "No distributed field system exists that: measures infiltration depth in real time; quantifies recharge contribution to aquifer; correlates rainfall intensity with groundwater gain; operates without research-grade instrumentation. Recharge success is assumed, not measured.",
        policy: ["Jal Shakti Abhiyan", "National Water Mission"]
      },
      {
        id: 103,
        title: "Subsurface Water Contamination Mapping at Farm-Cluster Scale",
        context: "Textile effluents from Tiruppur and peri-urban discharge impact downstream irrigation wells. Farmers detect contamination only after crop damage.",
        nationalContext: "Heavy metal and salinity contamination is growing in agricultural belts near industrial clusters.",
        engineeringGap: "No low-cost, in-field, multi-parameter groundwater contamination detection device exists that: detects salinity, heavy metals, nitrate simultaneously; operates in borewell water; does not require lab reagent kits; costs under Rs. 12,000. Current testing is lab-based and episodic.",
        policy: ["CPCB Groundwater Monitoring", "TNPCB Industrial Effluent Reports"]
      },
      {
        id: 104,
        title: "Localized Heat Stress Mapping Within Agricultural Micro-Regions",
        context: "Coimbatore experiences 38–42°C peaks. Crop canopy heat differs from IMD station data.",
        nationalContext: "Heatwave damage estimation is district-level, not farm-level.",
        engineeringGap: "No affordable, distributed farm-level heat stress mapping hardware network exists that: captures canopy temperature differentials; works under irrigation spray; operates season-long; costs under Rs. 3,000 per acre. Farm-scale thermal intelligence is missing.",
        policy: ["IMD Heatwave Monitoring", "National Mission for Sustainable Agriculture"]
      },
      {
        id: 105,
        title: "Early Flood Pulse Detection in Canal-Irrigated Agricultural Zones",
        context: "Sudden release from Bhavanisagar dam causes downstream flooding in low-lying fields. Warning reaches only main town centers.",
        nationalContext: "Flash flood damage to crops is frequent across canal systems.",
        engineeringGap: "No low-cost, distributed canal-level flood pulse detection system exists that: detects rising water velocity and pressure surge; works without telecom reliability; survives debris impact; operates autonomously. Farmers receive warnings too late.",
        policy: ["NDMA Flood Management Guidelines"]
      },
      {
        id: 106,
        title: "Evapotranspiration Measurement at Field Scale Without Weather Station Dependency",
        context: "Farmers rely on generic evapotranspiration data not specific to microclimate.",
        nationalContext: "Irrigation scheduling is based on modelled ET, not measured ET.",
        engineeringGap: "No low-cost hardware device exists that: directly measures evapotranspiration at 1-acre scale; integrates soil, canopy, and wind factors; operates without full meteorological station; costs under Rs. 15,000. Accurate farm-level ET measurement remains inaccessible.",
        policy: ["PMKSY Per Drop More Crop"]
      },
      {
        id: 107,
        title: "In-Field Detection of Soil Structural Degradation Due to Salinity",
        context: "Western Tamil Nadu soils show increasing salinity due to borewell irrigation. Farmers detect damage only after yield drop.",
        nationalContext: "Salinisation affects millions of hectares.",
        engineeringGap: "No portable field device exists that: measures soil structural integrity degradation; correlates sodium adsorption ratio in situ; works without lab testing; is farmer affordable. Salinity diagnosis is delayed and reactive.",
        policy: ["National Water Policy", "ICAR Soil Research"]
      },
      {
        id: 108,
        title: "Real-Time Surface Runoff Quantification in Small Farm Watersheds",
        context: "Heavy rainfall events in Coimbatore plateau cause topsoil erosion. Farmers build bunds without knowing runoff volume.",
        nationalContext: "Soil erosion costs India billions annually.",
        engineeringGap: "No low-cost hardware exists that: quantifies runoff rate and sediment load; installs at small bund outlets; operates without research instrumentation; costs below Rs. 8,000. Erosion is measured at watershed research stations, not farms.",
        policy: ["National Mission for Sustainable Agriculture"]
      },
      {
        id: 109,
        title: "Crop Canopy Water Stress Detection Before Visible Wilting During Heatwaves",
        context: "Heat stress in Coimbatore vegetable belts causes rapid yield collapse.",
        nationalContext: "Climate change increases extreme heat events across India.",
        engineeringGap: "No affordable, non-invasive, continuous canopy water-stress detection hardware exists for open fields. Thermal cameras are expensive. Sap sensors are research tools. Farmers react after damage.",
        policy: ["National Adaptation Fund for Climate Change"]
      },
      {
        id: 110,
        title: "Distributed Rural Tank Evaporation Quantification System",
        context: "Coimbatore relies on tanks and farm ponds. Evaporation losses are assumed, not measured.",
        nationalContext: "Evaporation loss in farm ponds is significant in semi-arid India.",
        engineeringGap: "No low-cost device exists that: continuously measures evaporation rate; correlates temperature, wind, humidity; operates unattended in open pond; costs under Rs. 5,000. Evaporation modelling replaces measurement.",
        policy: ["Jal Jeevan Mission", "National Water Mission"]
      }
    ]
  },

  // ============================================
  // THEME 2: Agri Systems and Rural Livelihood Infrastructure
  // ============================================
  {
    id: 2,
    name: "Agri Systems & Rural Livelihood Infrastructure",
    shortName: "Agri-Rural Livelihood",
    icon: "🌾",
    tagline: "Coimbatore-Anchored · Hardware-First · Nationally Scalable",
    problems: [
      {
        id: 201,
        title: "Portable Mechanical Coconut De-husking and Shell Separation Unit",
        context: "A TNAU-published study (September 2024) surveying 180 coconut farmers across six blocks in Coimbatore and Tiruppur districts found that high labour dearth ranks as the single biggest challenge in coconut farming. Coimbatore's agricultural workforce has collapsed by 50% between 1971 and 2011. For coconut farmers in Pollachi, Sultanpet, Anaimalai, and Thondamuthur blocks, de-husking is severely labour-constrained. No mechanical de-husker exists below Rs. 80,000 validated for Indian field conditions on a single-phase rural power supply.",
        nationalContext: "India produces 20.7 billion coconuts annually across 2.15 million hectares. The climber and de-husking labour shortage is pan-India. No sub-Rs. 1 lakh, single-phase, portable de-husking machine has been commercially validated at farmer-cluster scale in India.",
        engineeringGap: "Commercial de-huskers fail for smallholders on three counts: cost (Rs. 1.2–2.5 lakh), power (3-phase unavailable in rural blocks), and portability (fixed installation). A sub-Rs. 40,000 portable, single-phase or solar-powered unit that a FPO can own and move between member farms has not been engineered for Indian field conditions.",
        affectedPopulation: "Owner-farmers with 50–500 trees in Pollachi, Anaimalai, and Kinathukadavu taluks who sell dried copra or fresh nuts to Pollachi market. Most are smallholders (< 2 ha).",
        hardwareDesign: "Portable electromechanical coconut de-husker with integrated shell separator. Counter-rotating rubber-padded rollers (two pairs, staggered). Drive: 0.75 kW single-phase induction motor or 1 kW BLDC motor for solar DC input. Frame: 40mm MS square tube, galvanised, foldable legs — total weight target 55–70 kg. Throughput: 600–800 nuts/hour. Shell separator: Pneumatic blower (12V DC, 100 CFM). BOM target: Rs. 32,000–42,000.",
        softwareLayer: "Optional: ESP32 + hall-effect sensor counting nut throughput, logging to mobile app via BLE for FPO production tracking.",
        successIndicators: [
          { indicator: "Processing throughput", target: "600–800 nuts/hour (vs 400/day manual spike)" },
          { indicator: "Machine capital cost", target: "Under Rs. 42,000" },
          { indicator: "Power requirement", target: "0.75 kW single-phase 230V or 48V DC solar" },
          { indicator: "Roller replacement interval", target: "> 50,000 nuts between replacements" },
          { indicator: "Post-harvest value loss", target: "Reduced from 5–8% to < 1%" }
        ],
        prototypeScope: "In 48–72 hours: Build a proof-of-concept roller assembly using two pairs of 50mm diameter rubber-coated rollers powered by a 12V DC geared motor, mounted on a welded MS frame. Test on 20 fresh coconuts. Add a 12V DC blower for fibre-shell separation.",
        policy: ["National Coconut Development Board Capital Subsidy Scheme", "MOFPI-NABCONS Post-Harvest Loss Study 2022", "TNAU 2024 Survey", "PM-FME Scheme"]
      },
      {
        id: 202,
        title: "Automated Drip-Fertigation Dosing Controller with Inline EC and pH Sensing",
        context: "TNAU's Water Technology Centre documented that SSDI with precision fertigation delivered 148 tonnes/hectare yield — but 95% of Coimbatore's drip-irrigated farmers use venturi injectors with ±40–60% concentration accuracy. Fertiliser is the largest variable input cost for sugarcane (Rs. 18,000–25,000/hectare/season), yet 30% is lost to over-injection.",
        nationalContext: "India has 10.2 million hectares under micro-irrigation — the largest in the world. The fertigation dosing controller is absent in nearly 90% of installations. A sub-Rs. 25,000 drip-controller with inline sensing is the missing device in India's Rs. 4,000 crore annual micro-irrigation market.",
        engineeringGap: "Commercial precision fertigation controllers are greenhouse-grade (Rs. 2–5 lakh) and require 24/7 power. They are not designed for intermittent TANGEDCO supply, single-phase 230V, 45°C ambient, non-English-literate operators, or open field conditions.",
        affectedPopulation: "Sugarcane farmers in Coimbatore's Annur, Periyanaickenpalayam, and Pollachi taluks who have invested Rs. 50,000–1.5 lakh in drip systems under PMKSY subsidy.",
        hardwareDesign: "Inline EC sensor (titanium electrode, 0–10 mS/cm), inline pH sensor (ISFET-type), motorised peristaltic pump (12V DC, 0–2 L/min), STM32F4 microcontroller with PID control loop, 240×128 LCD display, bilingual Tamil/English labels. Power: 24V DC from 80W solar panel + 50Ah AGM battery. IP65 ABS enclosure. BOM target: Rs. 18,000–24,000.",
        softwareLayer: "LCD menu: set EC target by growth stage (3 presets for sugarcane). Alarm if EC deviates ±20% for > 5 minutes. Optional: ESP32 add-on for WiFi data logging to mobile app.",
        successIndicators: [
          { indicator: "EC measurement accuracy", target: "±0.15 mS/cm across 0–5 mS/cm range" },
          { indicator: "Fertiliser use reduction", target: "25–35% reduction per hectare" },
          { indicator: "Sugarcane yield improvement", target: "8–15% yield increase" },
          { indicator: "Device payback period", target: "Under 1 crop cycle (12 months)" },
          { indicator: "Controller uptime during power cuts", target: "100% — solar-powered" }
        ],
        prototypeScope: "In 48–72 hours: Wire an off-the-shelf EC probe + Atlas Scientific pH board to an Arduino Mega. Build PID control loop: read EC every 30 seconds, adjust PWM to peristaltic pump. Test in a 20L water tank — maintain EC at 2.5 mS/cm setpoint within ±0.3 mS/cm for 30 minutes.",
        policy: ["PMKSY — Per Drop More Crop", "TNAU SSDI Research, Bhavanisagar", "National Mission on Sustainable Agriculture"]
      },
      {
        id: 203,
        title: "Evaporative Cooling Zero-Energy Storage Chamber for Smallholder Vegetable Farmers",
        context: "Tamil Nadu accounts for 97% cold storage deficit for fruits and vegetables. Coimbatore's peri-urban vegetable belt grows tomato, brinjal, drumstick, okra, and leafy vegetables for city market. Vegetable prices crash by 25–40% daily if unsold. No affordable, off-grid, zero-electricity storage structure exists for a 1–2 acre vegetable farmer.",
        nationalContext: "India produces 207 million tonnes of vegetables annually. Post-harvest vegetable losses are 15–18% nationally. 97% of vegetables are transported by road without refrigeration.",
        engineeringGap: "Standard FAO ZECC design is not validated for humid agroclimatic zones. Coimbatore's RH is 55–75% even in summer, reducing evaporative cooling efficiency. No portable, humidity-adapted, high-efficiency evaporative produce storage unit below Rs. 12,000 exists in the Indian market.",
        affectedPopulation: "Vegetable farmers in Coimbatore's Thudiyalur and Saravanampatty zones growing tomato and brinjal on < 1 ha plots.",
        hardwareDesign: "Two-stage evaporative cooling: direct evaporative cooling with perlite-coated ceramic bricks + indirect pre-cooling with wet-wick heat exchanger. Inner storage: 1.2m × 0.8m × 0.8m (800 litre, ~300 kg capacity). Galvanised MS frame + HDPE food-grade inner liner. 25mm EPS foam insulation. Performance target: 10–12°C temperature drop at 65% RH. Zero electricity — gravity-fed water drip. BOM target: Rs. 9,500–13,000.",
        softwareLayer: "None required. Optional: DHT22 temperature/humidity logger inside chamber with Bluetooth tag.",
        successIndicators: [
          { indicator: "Internal chamber temperature", target: "26–28°C (10–12°C drop) at 38°C, 65% RH" },
          { indicator: "Vegetable shelf life extension", target: "From 8–12 hours to 36–48 hours" },
          { indicator: "Water consumption per 24 hours", target: "< 8 litres" },
          { indicator: "Unit cost", target: "Under Rs. 13,000" },
          { indicator: "Farmer income improvement", target: "Rs. 8,000–15,000 per acre per season" }
        ],
        prototypeScope: "In 48–72 hours: Build a 1:3 scale prototype using two nested plastic bins, perlite beads, and a 2L drip water bottle. Place DHT22 sensor inside and outside. Run 4-hour test at ambient 35°C — target > 8°C drop. Compare against sand ZECC.",
        policy: ["MOFPI MIDH", "NABCONS 2022 Post-Harvest Loss Study", "FAO ZECC Design Guidelines"]
      },
      {
        id: 204,
        title: "Low-Cost Capacitive Soil Nutrient Sensor for Real-Time NPK and pH Monitoring",
        context: "Tamil Nadu issued 4.7 crore Soil Health Cards, but recommendations are static and 2-year interval based. Over-application of urea has resulted in 29.4% of groundwater samples exceeding the 45 mg/L nitrate limit (CGWB 2024). The commercial soil NPK sensor market offers units at Rs. 25,000–80,000 — not for 1–3 acre individual farmers.",
        nationalContext: "India issued 23 crore Soil Health Cards but fewer than 30% of farmers change fertilisation practice. Nitrogen use efficiency is below 40%. A real-time sensor below Rs. 5,000 would transform precision agriculture for 84 million smallholder households.",
        engineeringGap: "Electrochemical ISE sensors accurate enough for soil nutrient measurement at Rs. 2,000–5,000 have not been engineered into a ruggedised, field-deployable product. NIR spectroscopy requires dry, homogenised samples. The gap is a low-drift, temperature-compensated, field-calibratable ISE sensor.",
        affectedPopulation: "Drip-irrigated sugarcane and banana farmers in Coimbatore's Annur, Pollachi, and Kinathukadavu taluks. Marginal farmers who over-apply urea spend Rs. 6,000–8,000 more per acre per season.",
        hardwareDesign: "In-situ soil NPK and pH measurement rod. Nitrate, Potassium and Ammonium ISE membranes + iridium oxide pH electrode in a single 250mm × 12mm ABS rod. ADS1115 ADC + STM32L0 MCU with BLE 5.0. Power: CR2032 coin cell, 6-month life. IP67. Accuracy: ±15%. BOM target: Rs. 3,800–5,500.",
        softwareLayer: "BLE Android app: displays soil nutrients in mg/kg, colour-coded against TNAU crop-stage targets. Generates daily instruction: 'Increase urea by 15% today'. No cloud required.",
        successIndicators: [
          { indicator: "Nitrate ISE accuracy", target: "±15% at 50–200 mg/kg range" },
          { indicator: "Battery life", target: "> 6 months at 4 readings/day" },
          { indicator: "Device cost", target: "Under Rs. 5,500" },
          { indicator: "Fertiliser savings", target: "20–30% reduction in nitrogen" },
          { indicator: "Groundwater nitrate reduction", target: "Measurable decrease over 2 seasons" }
        ],
        prototypeScope: "In 48–72 hours: Fabricate nitrate ISE membrane (Aliquat 336S + PVC in THF) and pH electrode (Ir oxide on titanium wire). Wire to ADS1115 + Arduino Nano. Test in 5 soil samples of known NPK. BLE output to phone.",
        policy: ["Soil Health Card Scheme", "CGWB Groundwater Quality Report 2024", "PMKSY Micro Irrigation Mission"]
      },
      {
        id: 205,
        title: "Motorised Semi-Automated Turmeric Boiling Unit with Waste Heat Recovery",
        context: "Erode — 80 km east of Coimbatore — handles 60% of India's turmeric exports. Post-harvest boiling in open pots wastes 40–50% of thermal energy. Women perform 90% of the boiling labour — a documented occupational health hazard. No improved boiling unit with waste heat recovery exists below Rs. 40,000.",
        nationalContext: "India produces 1.1 million tonnes of turmeric annually. APEDA mandates curcumin content above 3% for export — poor temperature control causes degradation reducing export value by Rs. 500–800 per quintal.",
        engineeringGap: "No product exists at the intersection of: Rs. 25,000–40,000 price; firewood/biogas fuel compatible; double-wall insulated pot with waste heat recovery; temperature sensor preventing over-boiling; mechanical assist for batch lift-out.",
        affectedPopulation: "Turmeric-growing households in Erode and Coimbatore districts — estimated 1.2 lakh families. Women suffer steam and smoke exposure causing chronic respiratory illness.",
        hardwareDesign: "Insulated double-wall MS pot (200L capacity, outer water jacket). Firebrick combustion chamber (60% thermal efficiency vs 30% open chulha). K-type thermocouple with buzzer at 85°C and 92°C alarm. Counterweighted pivoting arm for 100 kg batch lifting. 50mm rockwool insulation. Spiral copper coil steam condenser. BOM target: Rs. 28,000–38,000.",
        softwareLayer: "7-segment LED temperature display. Programmable buzzer: 85°C = gelatinisation start; 92°C = continuous alarm. Optional BLE data logger.",
        successIndicators: [
          { indicator: "Firewood consumption", target: "Reduction from 150–200 kg to 80–100 kg per tonne" },
          { indicator: "Thermal efficiency", target: "> 55% vs 30% baseline" },
          { indicator: "Curcumin content", target: "> 3.5% DW (export grade)" },
          { indicator: "Worker lifting force", target: "Reduced from 200 kg to < 30 kg" },
          { indicator: "Unit cost", target: "Under Rs. 38,000" }
        ],
        prototypeScope: "In 48–72 hours: Build 1:5 scale double-wall vessel from nested SS pots. Compare boiling time and LPG consumption vs single-wall. Wire K-type thermocouple to Arduino with MAX6675 for buzzer alarm.",
        policy: ["PM-FME Scheme", "APEDA Turmeric Export Standards", "ICAR-NRC Turmeric Research"]
      },
      {
        id: 206,
        title: "Ruggedised Portable Grain Moisture Meter with Temperature-Corrected Display",
        context: "Paddy harvested during NE Monsoon is at 20–26% moisture — above TNCSC's 17% limit. Farmers selling wet paddy face a 15–25% price discount (Rs. 400–600/quintal below MSP). Commercial grain moisture meters cost Rs. 2,500–6,000 but are absent from Coimbatore's agricultural supply shops.",
        nationalContext: "India produces 130 million tonnes of rice annually. Post-harvest grain losses are 4–8% nationally. 60% of grain stored at farm level is stored above safe moisture levels.",
        engineeringGap: "The cost floor for a validated capacitance grain moisture meter has not been pushed below Rs. 2,000. Tamil Nadu's 30–40°C ambient during harvest causes uncorrected dielectric readings to err by 1.5–2 percentage points.",
        affectedPopulation: "Paddy and maize farmers in Annur, Avinashi, Sulur, and Thondamuthur blocks selling to TNCSC.",
        hardwareDesign: "Parallel-plate capacitor grain cell (60mm × 60mm copper-clad FR4 PCB, 15mm spacing). ESP32 capacitive sensing. NTC thermistor temperature compensation. Factory-calibrated for Ponni, ADT 37, IR 50, Pioneer 3396, HQPM 1 varieties. 16×2 LCD display. 3× AA or USB-C LiPo power. ABS housing, IP54. BOM target: Rs. 1,100–1,600.",
        softwareLayer: "Firmware: instant read (3-second) and average mode (5-reading). Optional USB-C data output for TNCSC procurement logging.",
        successIndicators: [
          { indicator: "Moisture reading accuracy", target: "±0.8% at 14–22% range" },
          { indicator: "Temperature compensation", target: "±0.5% across 20–40°C" },
          { indicator: "Unit cost", target: "Under Rs. 1,600" },
          { indicator: "Battery life", target: "500 tests per charge" },
          { indicator: "Farmer price improvement", target: "Rs. 300–600 per quintal recovered" }
        ],
        prototypeScope: "In 48–72 hours: Build parallel-plate capacitor cell from copper-clad PCB on 3D-printed spacer. Wire to ESP32. Measure capacitance vs controlled moisture samples. Add NTC thermistor and temperature correction.",
        policy: ["TNCSC Paddy Procurement Standards", "NABCONS 2022 Post-Harvest Loss Study", "National Food Security Act 2013"]
      },
      {
        id: 207,
        title: "Bicycle-Frame Semi-Mechanised Sprayer with Electrostatic Nozzle",
        context: "Coimbatore's agricultural labour dropped by almost 50% (1971–2011). A knapsack sprayer covers 0.5–0.75 acres/day — a 3-acre farmer spends Rs. 2,400–4,800 per application × 6–8 applications/season. Workers walk 12–18 km carrying 15 kg.",
        nationalContext: "India applies 220,000 tonnes of pesticides annually. Chemical application efficiency is below 30%. Electrostatic spraying reduces pesticide use by 40–60% but costs Rs. 25,000–80,000.",
        engineeringGap: "No device in the Rs. 6,000–10,000 range provides electrostatic nozzle advantage + reduced physical effort (walk-behind) + a 40L+ tank for longer coverage.",
        affectedPopulation: "Vegetable and cotton farmers in Coimbatore's Mettupalayam, Pollachi, and Annur taluks.",
        hardwareDesign: "Walk-behind bicycle-frame with 40L SS tank. Electrostatic nozzle: rotary atomiser disc (3000 RPM) + flyback converter HV circuit (25kV DC from 12V battery). Two 1m lateral spray arms. 12V DC diaphragm pump. 12V 7Ah lead-acid battery, 4-hour operation. 20W solar panel for recharge. BOM target: Rs. 6,500–8,500.",
        softwareLayer: "Battery level indicator. Optional: ESP32 + GPS for spray coverage tracking.",
        successIndicators: [
          { indicator: "Field coverage per day", target: "3–4 acres (vs 0.5–0.75 acres knapsack)" },
          { indicator: "Pesticide use reduction", target: "35–50% via electrostatic coverage" },
          { indicator: "Device cost", target: "Under Rs. 8,500" },
          { indicator: "Physical load on operator", target: "Zero backpack load" },
          { indicator: "Payback period", target: "Under 1 crop season" }
        ],
        prototypeScope: "In 48–72 hours: Build HV electrostatic nozzle circuit on breadboard. Attach rotary disc atomiser to 12V motor. Verify charged droplets deposit on both leaf surfaces. Weld simple push-handle to bicycle wheel as frame proof-of-concept.",
        policy: ["Tamil Nadu Agricultural Mechanisation Scheme", "Central Insecticides Board Standards", "ICAR-NCIPM Pest Management Guidelines"]
      },
      {
        id: 208,
        title: "Modular Solar-Powered Cold Box with Phase-Change Material for Last-Mile Milk Chilling",
        context: "Coimbatore has 2,845 dairy cooperative societies. Tribal dairy villages in Anaimalai Hills experience 38–42°C summers. Raw milk exceeds bacterial threshold within 2–3 hours of milking. Village-level bulk milk coolers (Rs. 3–8 lakh) require 3-phase power — unavailable in 60% of tribal forest fringe villages.",
        nationalContext: "India produces 236 million tonnes of milk annually. NABCONS estimates 2–7% milk loss from improper chilling. Village-level chilling infrastructure is absent in remote and tribal zones.",
        engineeringGap: "BMCs require 3-phase supply unavailable in tribal areas. Solar-powered milk coolers cost Rs. 1.5–3 lakh. PCM-based milk chilling has been demonstrated at lab scale by IIT Madras but not commercialised at sub-Rs. 80,000.",
        affectedPopulation: "Tribal dairy households (Irula, Muduvar communities) in Anaimalai Hills managing 2–5 animals each. Milk income is the only daily cash income.",
        hardwareDesign: "200L PCM chilling box. Octadecane-water eutectic PCM (80L, in HDPE pouches lining all walls). 300W PV panel + 100Ah LiFePO4 battery + 12V DC compressor for 3-hour morning refreeze. 100mm PIR foam insulation. DS18B20 temperature sensor + OLED display. ESP32 + SIM800L GSM for remote temperature monitoring. BOM target: Rs. 65,000–78,000.",
        softwareLayer: "ESP32 firmware: logs milk temperature every 15 minutes. SMS alert if temperature > 10°C for > 30 minutes. Timer-based morning refreeze cycle. JSON API push to AAVIN dashboard.",
        successIndicators: [
          { indicator: "Milk temperature maintained", target: "< 7°C for 8–10 hours at 38°C ambient" },
          { indicator: "Milk rejection rate", target: "Reduced from 15–25% to < 3%" },
          { indicator: "Solar compressor run time", target: "< 3 hours per day" },
          { indicator: "Unit cost", target: "Under Rs. 80,000" },
          { indicator: "Income recovery (10-HH village)", target: "Rs. 2.4–4.5 lakh per month" }
        ],
        prototypeScope: "In 48–72 hours: Build 20L PCM-insulated cooler with Styrofoam box lined with HDPE pouches of 8% salt-water PCM. Measure temperature at 35°C ambient over 6 hours. Add 12V mini compressor for PCM refreeze demo.",
        policy: ["NDDB Village Level Chilling Equipment Scheme", "AAVIN Tamil Nadu Cooperative Dairy", "Ministry of Animal Husbandry DAHD 2023–24"]
      },
      {
        id: 209,
        title: "Mechanical Weeder and Mulch-Layer Combo Tool for Labour-Short Vegetable Beds",
        context: "Weeding costs Rs. 20,000–48,000 per acre per year in Coimbatore's vegetable belt. Farm labour pool is collapsing (43% to 22% of villages between 2012–2024). Existing wheel hoes are designed for 45+ cm row spacing — too wide for Coimbatore's 30–45 cm vegetable beds.",
        nationalContext: "Weed control accounts for 15–20% of total crop production cost in India. ICAR estimates annual yield losses from weeds at Rs. 45,000 crore. No weeder exists for 30–40 cm narrow vegetable beds.",
        engineeringGap: "None of existing tools works at sub-Rs. 4,000 for 30–45 cm vegetable rows. No integrated weeder-mulch-layer exists in the Indian market.",
        affectedPopulation: "Women vegetable farmers in Perianaickenpalayam, Sulur, and Saravanampatty managing 0.5–2 acre plots.",
        hardwareDesign: "Single-wheel frame (20cm pneumatic tyre). Two 15cm stirrup-hoe blades in V-configuration (28cm working width). MS frame, adjustable handle height. Mulch layer: spooled coir mulch mat roll on rear axle bracket with soil-tuck wings. Total weight: 4.5 kg. BOM target: Rs. 2,800–3,600.",
        softwareLayer: "None. Purely mechanical device.",
        successIndicators: [
          { indicator: "Field coverage rate", target: "1.5–2.5 acres/day (vs 0.1–0.15 hand hoe)" },
          { indicator: "Device cost", target: "Under Rs. 3,600" },
          { indicator: "Root zone disturbance", target: "Zero below 5cm" },
          { indicator: "Labour cost reduction", target: "Rs. 14,000–22,000 saved per season" },
          { indicator: "Weed-free period with mulch", target: "3 weeks vs 10–14 days" }
        ],
        prototypeScope: "In 48–72 hours: Fabricate prototype from MS tube, bicycle wheel, and two bent MS stirrup hoe blades. Push through prepared soil bed at 35cm spacing. Add coir mat spool on rear bracket and test mulch laying over 5 metres.",
        policy: ["Tamil Nadu Agricultural Mechanisation Scheme", "National Horticulture Mission", "ICAR-CIAE Farm Equipment Standards"]
      },
      {
        id: 210,
        title: "Automated Coir Pith Composting Bioreactor with Aeration Control",
        context: "Coimbatore tops Tamil Nadu in coconut area. Coconut de-husking generates 1.5–2.0 kg of coir pith per coconut. Raw coir pith has C:N ratio of 1050:1. Converting to compost takes 6–18 months in open windrows. No automated enclosed bioreactor exists below Rs. 1.5 lakh at 2–5 tonne batch capacity.",
        nationalContext: "India generates 2.5 million tonnes of coir pith annually. Most is either burned or dumped. Composted coir pith sells at Rs. 8,000–15,000 per tonne in the horticulture market.",
        engineeringGap: "Open windrow requires daily labour, constant moisture management, and produces methane. Enclosed bioreactor with automated aeration has not been designed for Rs. 1–1.5 lakh at 2–5 tonne batch scale.",
        affectedPopulation: "Coir fibre unit workers and FPO members in Pollachi taluk. Small coir fibre processors face TNPCB disposal penalties.",
        hardwareDesign: "2-tonne batch enclosed cylindrical drum (2.5m × 1.2m). 3mm MS plate. Perforated PVC aeration pipes with 12V DC blower (80 CFM, timer-controlled). 4× DS18B20 temperature probes. FDR-type capacitive moisture sensor with solenoid irrigation valve. Manual lever-and-ratchet rotation. 12V 50Ah battery + 80W solar panel. BOM target: Rs. 95,000–1,25,000.",
        softwareLayer: "STM32 firmware: aeration timer, temperature monitoring with SMS alert. 45-day process log on SD card. FPO app via BLE showing batch status.",
        successIndicators: [
          { indicator: "Composting cycle time", target: "45–55 days (vs 6–18 months)" },
          { indicator: "Labour input", target: "< 2 person-days per tonne" },
          { indicator: "Compost C:N ratio", target: "< 25:1 (TNAU grade)" },
          { indicator: "Revenue per tonne", target: "Rs. 8,000–12,000" },
          { indicator: "Device payback", target: "< 12 months from compost sales" }
        ],
        prototypeScope: "In 48–72 hours: Build 50-litre bioreactor from plastic barrel with perforated PVC aeration stubs and 5V USB fan. Pack with coir pith + Trichoderma inoculant. Log temperature over 48 hours with DS18B20. Add DHT22 moisture sensor and servo valve demo.",
        policy: ["TNPCB Coir Industry Waste Management", "Coconut Development Board", "PM-FME Scheme", "PGS-India Organic Certification"]
      }
    ]
  },

  // ============================================
  // THEME 3: Public Health and Primary Care Infrastructure
  // ============================================
  {
    id: 3,
    name: "Public Health & Primary Care Infrastructure",
    shortName: "Public Health",
    icon: "🏥",
    tagline: "Coimbatore-Anchored · Hardware-Only · Deep-Tech · Patent-Oriented · High-Scale Impact",
    problems: [
      {
        id: 301,
        title: "Early-Stage Sepsis Detection at Primary Health Centre Level",
        context: "Primary Health Centres in rural Coimbatore handle high patient loads with limited diagnostic infrastructure. Sepsis progression is often detected late because confirmation requires lab tests such as lactate measurement and blood culture.",
        nationalContext: "India records significant mortality from undiagnosed sepsis, particularly in rural and peri-urban settings. Most PHCs lack real-time inflammatory biomarker detection capability.",
        engineeringGap: "No low-cost, rugged, multi-biomarker detection hardware exists that: detects early inflammatory progression; works without full laboratory setup; functions in high-temperature rural environments; costs below Rs. 15,000 per unit; requires minimal consumables.",
        policy: ["National Health Mission", "Ayushman Bharat Health and Wellness Centres"]
      },
      {
        id: 302,
        title: "Non-Invasive Continuous Hemoglobin Monitoring for Rural Anemia Screening",
        context: "Anemia prevalence in Tamil Nadu remains high among women and adolescents. Hemoglobin testing requires finger-prick blood sampling or lab-based analyzers.",
        nationalContext: "India has one of the highest anemia burdens globally. Screening is episodic, not continuous.",
        engineeringGap: "No affordable, accurate, non-invasive hemoglobin measurement device exists that: works without blood sampling; maintains calibration across skin tones; operates in non-clinical environments; costs under Rs. 5,000.",
        policy: ["Anemia Mukt Bharat", "National Iron Plus Initiative"]
      },
      {
        id: 303,
        title: "Portable Early-Stage Kidney Dysfunction Detection Without Lab Testing",
        context: "Chronic Kidney Disease cases in western Tamil Nadu are rising. Early detection requires serum creatinine testing.",
        nationalContext: "CKD burden is increasing across rural India. Early-stage detection is rare due to lack of diagnostic facilities.",
        engineeringGap: "No portable hardware device exists that: detects early kidney function decline; operates without biochemical lab reagents; provides quantitative reliability; is affordable for PHC deployment.",
        policy: ["NPCDCS Program"]
      },
      {
        id: 304,
        title: "Rapid Tuberculosis Infectivity Detection Without Sputum Laboratory",
        context: "TB screening in rural blocks requires sputum sample transport to GeneXpert facilities.",
        nationalContext: "India carries the highest TB burden globally.",
        engineeringGap: "No low-cost, point-of-care hardware exists that: detects active infectivity rapidly; does not rely on PCR lab infrastructure; is reusable and rugged; costs under Rs. 20,000.",
        policy: ["National TB Elimination Programme"]
      },
      {
        id: 305,
        title: "Continuous Neonatal Vital Monitoring for Low-Resource Maternity Centres",
        context: "Primary maternity centres lack continuous neonatal oxygen saturation and respiration monitoring.",
        nationalContext: "Neonatal mortality remains a major public health challenge.",
        engineeringGap: "No ultra-low-cost, reliable neonatal monitoring system exists that: detects early respiratory distress; maintains sensor reliability on fragile skin; operates during power cuts; costs under Rs. 8,000.",
        policy: ["LaQshya Programme", "National Health Mission"]
      },
      {
        id: 306,
        title: "Real-Time Indoor Air Quality Hazard Detection in Rural Schools and Anganwadis",
        context: "Anganwadis in peri-urban Coimbatore use biomass or poor ventilation. Indoor air quality is not monitored.",
        nationalContext: "Indoor air pollution causes significant respiratory illness.",
        engineeringGap: "No low-cost, continuous, multi-parameter indoor air hazard detection device exists that: detects PM2.5, CO, and VOC reliably; operates without internet; maintains calibration in dusty environments; costs below Rs. 3,000 per classroom.",
        policy: ["National Clean Air Programme"]
      },
      {
        id: 307,
        title: "Early Detection of Postpartum Hemorrhage in Rural Delivery Settings",
        context: "Postpartum hemorrhage remains a leading cause of maternal mortality. Blood loss estimation is visual and inaccurate.",
        nationalContext: "PPH accounts for significant maternal deaths annually.",
        engineeringGap: "No quantitative, low-cost blood loss measurement hardware exists that: works in rural delivery rooms; does not rely on lab support; provides real-time alert; costs under Rs. 10,000. Estimation remains subjective.",
        policy: ["Pradhan Mantri Surakshit Matritva Abhiyan"]
      },
      {
        id: 308,
        title: "Field-Deployable Early Dengue Severity Prediction Tool",
        context: "Coimbatore experiences dengue outbreaks. Severity prediction requires platelet monitoring.",
        nationalContext: "India faces seasonal dengue epidemics.",
        engineeringGap: "No hardware system exists that: predicts severity progression early; works without lab platelet count; operates at PHC level; is affordable for district deployment. Severity detection is reactive.",
        policy: ["National Vector Borne Disease Control Programme"]
      },
      {
        id: 309,
        title: "Rapid Detection of Subclinical Pneumonia in Children Without Imaging",
        context: "Childhood pneumonia detection depends on chest X-ray or clinical assessment.",
        nationalContext: "Pneumonia remains a leading cause of child mortality.",
        engineeringGap: "No low-cost, imaging-free, hardware-based lung-function detection system exists that: identifies early lung fluid accumulation; operates in rural clinics; requires no radiology infrastructure; costs below Rs. 10,000.",
        policy: ["Integrated Management of Neonatal and Childhood Illness (IMNCI)"]
      },
      {
        id: 310,
        title: "Low-Cost Early Detection of Diabetic Neuropathy in Primary Care",
        context: "Diabetes prevalence is rising in Coimbatore urban-rural transition zones. Neuropathy is detected after ulcer formation.",
        nationalContext: "India has one of the largest diabetic populations globally.",
        engineeringGap: "No affordable, objective neuropathy detection hardware exists that: quantifies nerve damage progression; operates without specialist training; is portable; costs under Rs. 6,000. Current tests are subjective or clinic-bound.",
        policy: ["NPCDCS"]
      }
    ]
  },

  // ============================================
  // THEME 4: Circular Economy and Waste Worker Integration
  // ============================================
  {
    id: 4,
    name: "Circular Economy & Waste Worker Integration",
    shortName: "Circular Economy",
    icon: "♻️",
    tagline: "Coimbatore-Anchored · Hardware-Only · Deep-Tech · Patent-Oriented · High-Scale Impact",
    problems: [
      {
        id: 401,
        title: "Real-Time Segregation Verification of Mixed Municipal Waste at Source",
        context: "Coimbatore Corporation reports source segregation compliance above 70% on paper, but secondary sorting centres still receive 30–40% mixed waste. Informal waste workers manually re-segregate, increasing exposure to biohazards.",
        nationalContext: "India generates over 170,000 tonnes of municipal solid waste daily. Segregation compliance is poorly verifiable.",
        engineeringGap: "No affordable hardware system exists that: objectively verifies segregation quality at household or ward level; identifies organic, plastic, and hazardous waste contamination in mixed bags; operates in field conditions; costs under Rs. 10,000 per monitoring unit.",
        policy: ["Swachh Bharat Mission", "Solid Waste Management Rules 2016"]
      },
      {
        id: 402,
        title: "On-Site Quantification of Microplastic Load in Urban Drainage Channels",
        context: "Coimbatore's stormwater drains carry textile microfibres and plastic debris into Noyyal river.",
        nationalContext: "Urban microplastic pollution is unquantified at city scale.",
        engineeringGap: "No field-deployable, low-cost hardware exists that: measures microplastic concentration in flowing water; operates without lab microscopy; works in turbid water; costs under Rs. 15,000.",
        policy: ["CPCB Plastic Waste Management Rules"]
      },
      {
        id: 403,
        title: "Low-Cost Hazardous Gas Exposure Monitoring for Informal Waste Workers",
        context: "Waste pickers in Vellalore dump yard face methane, hydrogen sulfide, and ammonia exposure without real-time monitoring.",
        nationalContext: "Over 1.5 million informal waste workers operate without protective detection systems.",
        engineeringGap: "No rugged, multi-gas exposure device exists that: continuously monitors multiple landfill gases; operates in extreme humidity and dust; is wearable and low maintenance; costs under Rs. 5,000.",
        policy: ["Occupational Safety Codes", "Swachh Bharat Mission 2.0"]
      },
      {
        id: 404,
        title: "Decentralized Real-Time Leachate Toxicity Detection at Landfill Sites",
        context: "Vellalore landfill produces leachate during monsoon. Testing is periodic and lab-based.",
        nationalContext: "Unmonitored landfill leachate contaminates groundwater nationwide.",
        engineeringGap: "No in-situ hardware exists that: detects toxic heavy metal load in leachate continuously; survives corrosive environments; requires minimal calibration; costs below Rs. 20,000.",
        policy: ["Solid Waste Management Rules 2016", "CPCB Landfill Guidelines"]
      },
      {
        id: 405,
        title: "Quantification of Organic Waste Decomposition Efficiency in Community Composting Units",
        context: "Decentralized composting units in Coimbatore lack objective decomposition efficiency metrics.",
        nationalContext: "Thousands of ward-level compost units operate without process monitoring.",
        engineeringGap: "No low-cost embedded monitoring system exists that: quantifies compost stability; detects incomplete decomposition; measures pathogen reduction; costs under Rs. 8,000.",
        policy: ["Swachh Bharat Urban", "Fertilizer Control Order"]
      },
      {
        id: 406,
        title: "Detection of Illegal Biomedical Waste Mixing in Municipal Streams",
        context: "Small clinics sometimes mix biomedical waste with municipal waste.",
        nationalContext: "Biomedical waste mismanagement is widespread.",
        engineeringGap: "No field hardware exists that: identifies biomedical waste contamination in mixed streams; detects pathogen risk or hazardous markers; operates at transfer stations; is affordable for municipal deployment.",
        policy: ["Biomedical Waste Management Rules 2016"]
      },
      {
        id: 407,
        title: "Real-Time Textile Sludge Toxicity Monitoring for Small Dyeing Units",
        context: "Textile clusters near Coimbatore generate dye sludge. Testing is lab-based and infrequent.",
        nationalContext: "Small textile units struggle to comply with environmental norms.",
        engineeringGap: "No portable sludge toxicity detection hardware exists that: quantifies heavy metal and dye load onsite; operates without reagent-heavy lab kits; costs below Rs. 25,000.",
        policy: ["TNPCB Effluent Standards", "CPCB Hazardous Waste Rules"]
      },
      {
        id: 408,
        title: "On-Site Plastic Polymer Identification for Informal Recycling Chains",
        context: "Waste workers sort plastics visually. Misclassification reduces recycling value.",
        nationalContext: "Polymer mis-sorting leads to recycling inefficiency.",
        engineeringGap: "No low-cost, handheld polymer identification device exists that: distinguishes PET, HDPE, LDPE, PP reliably; operates without expensive spectroscopy; is usable by informal workers; costs under Rs. 10,000. Existing NIR scanners cost Rs. 1–3 lakh.",
        policy: ["Plastic Waste Management Rules"]
      },
      {
        id: 409,
        title: "Distributed Real-Time Waste Collection Route Efficiency Measurement",
        context: "Coimbatore waste trucks follow fixed routes regardless of bin fill levels.",
        nationalContext: "Urban waste collection inefficiency increases fuel cost and emissions.",
        engineeringGap: "No hardware system exists that: measures bin fill level accurately in mixed waste conditions; survives vandalism and monsoon; operates without continuous internet; costs below Rs. 3,000 per bin.",
        policy: ["Smart Cities Mission", "Swachh Bharat Urban"]
      },
      {
        id: 410,
        title: "Low-Cost Decentralized E-Waste Component Toxicity Screening",
        context: "Informal e-waste dismantling in Tamil Nadu exposes workers to heavy metals.",
        nationalContext: "India generates over 1 million tonnes of e-waste annually.",
        engineeringGap: "No portable hardware exists that: rapidly detects lead, cadmium, mercury in components; operates without XRF lab equipment; is affordable for recycler cooperatives; costs under Rs. 30,000.",
        policy: ["E-Waste Management Rules 2022"]
      }
    ]
  },

  // ============================================
  // THEME 5: Inclusive Technology and Social Protection Systems
  // ============================================
  {
    id: 5,
    name: "Inclusive Technology & Social Protection Systems",
    shortName: "Inclusive Tech",
    icon: "🤝",
    tagline: "Coimbatore-Anchored · Hardware-Only · Deep-Tech · Patent-Oriented · High-Scale Impact",
    problems: [
      {
        id: 501,
        title: "Low-Cost Real-Time Fall Prediction for Elderly Living Alone",
        context: "Coimbatore's urban–rural transition zones have a growing elderly population living independently while children migrate for work. Falls are detected only after injury. Current systems are either camera-based (privacy issues) or expensive wearable imports.",
        nationalContext: "India's elderly population is projected to exceed 19% by 2050. Fall-related injury is a major cause of hospitalization.",
        engineeringGap: "No affordable hardware system exists that: predicts instability before fall occurs; operates without intrusive cameras; works in non-clinical home environments; requires minimal charging; costs under Rs. 5,000. Current systems detect after fall, not pre-fall instability.",
        policy: ["National Programme for Health Care of the Elderly"]
      },
      {
        id: 502,
        title: "Non-Invasive Hearing Loss Quantification in Rural School Children",
        context: "Government schools in Coimbatore district lack objective hearing screening tools. Screening is subjective and episodic.",
        nationalContext: "Millions of children with mild-to-moderate hearing impairment remain undiagnosed.",
        engineeringGap: "No low-cost, objective, portable hearing quantification hardware exists that: operates outside audiology labs; maintains calibration; works in noisy school environments; costs under Rs. 4,000.",
        policy: ["Rashtriya Bal Swasthya Karyakram"]
      },
      {
        id: 503,
        title: "Real-Time Early Detection of Cognitive Decline Without Clinical Imaging",
        context: "Early dementia signs in aging populations are unnoticed until functional impairment.",
        nationalContext: "India faces rising dementia burden with limited screening access.",
        engineeringGap: "No affordable hardware-based cognitive biomarker detection system exists that: quantifies neurological decline objectively; operates outside MRI or neuro-lab settings; is scalable at PHC level; costs under Rs. 15,000.",
        policy: ["National Mental Health Programme"]
      },
      {
        id: 504,
        title: "Affordable Objective Assessment of Motor Coordination in Children With Developmental Delay",
        context: "Early motor disorders in children in Tamil Nadu often go undiagnosed until school age.",
        nationalContext: "Millions of children lack early detection of coordination disorders.",
        engineeringGap: "No low-cost hardware system exists that: quantifies fine and gross motor coordination; works without motion-capture labs; operates in Anganwadi settings; costs below Rs. 8,000.",
        policy: ["Rashtriya Bal Swasthya Karyakram"]
      },
      {
        id: 505,
        title: "Low-Cost Braille-to-Digital Text Converter for Visually Impaired Students",
        context: "Visually impaired students in Coimbatore's special schools lack affordable tools for digital document creation from Braille input.",
        nationalContext: "India has millions of visually impaired individuals. Digital inclusion remains limited.",
        engineeringGap: "No affordable, portable hardware device exists that: converts physical Braille input to digital text in real time; supports multiple Indian languages; costs below Rs. 8,000; works without internet connectivity.",
        policy: ["Rights of Persons with Disabilities Act 2016"]
      },
      {
        id: 506,
        title: "Wearable Seizure Detection and Alert System for Epilepsy Patients in Rural Areas",
        context: "Epilepsy patients in rural Tamil Nadu lack continuous monitoring. Seizures in isolated settings are life-threatening.",
        nationalContext: "India has an estimated 12 million epilepsy patients. Most lack access to neurological monitoring.",
        engineeringGap: "No affordable, non-invasive, wearable seizure detection hardware exists that: detects tonic-clonic and absence seizures; sends automatic alerts; works without smartphone dependency; costs under Rs. 6,000.",
        policy: ["National Mental Health Programme"]
      },
      {
        id: 507,
        title: "Assistive Communication Device for Non-Verbal Children with Cerebral Palsy",
        context: "Non-verbal children in Tamil Nadu's disability centres lack affordable augmentative communication devices.",
        nationalContext: "Assistive technology access remains extremely limited for children with severe disabilities.",
        engineeringGap: "No locally manufactured, affordable communication device exists that: enables symbol-based communication; is robust enough for daily use; supports Tamil language; costs below Rs. 10,000.",
        policy: ["National Trust for Welfare of Persons with Disabilities"]
      },
      {
        id: 508,
        title: "Low-Cost Prosthetic Hand with Basic Grip Functions for Rural Amputees",
        context: "Upper limb amputees in rural Coimbatore are fitted with cosmetic prostheses without functional grip.",
        nationalContext: "India has millions of amputees, most with passive cosmetic prosthetics.",
        engineeringGap: "No affordable, functional prosthetic hand exists that: provides basic grip patterns; is mechanically durable; requires no electronic maintenance; costs below Rs. 15,000. Current functional prosthetics cost Rs. 1–5 lakh.",
        policy: ["ADIP Scheme (Assistance to Disabled Persons)"]
      },
      {
        id: 509,
        title: "Portable Water Quality Testing Kit for Rural Self-Help Groups",
        context: "Women SHGs in Coimbatore's rural blocks manage community water sources but have no testing capability.",
        nationalContext: "Rural water quality monitoring is centralised and infrequent.",
        engineeringGap: "No portable multi-parameter water quality testing hardware exists that: tests bacterial contamination, fluoride, arsenic, and TDS; operates without lab infrastructure; gives results within 30 minutes; costs under Rs. 8,000.",
        policy: ["Jal Jeevan Mission"]
      },
      {
        id: 510,
        title: "Smart Medication Adherence Device for Elderly Patients with Multiple Prescriptions",
        context: "Elderly patients in Coimbatore managing multiple medications frequently miss doses or take incorrect combinations.",
        nationalContext: "Medication non-adherence costs India's healthcare system significantly.",
        engineeringGap: "No affordable, automated medication dispensing and reminder device exists that: handles multiple medications; provides audible and visual alerts in Tamil; tracks adherence without smartphone; costs below Rs. 4,000.",
        policy: ["National Programme for Health Care of the Elderly"]
      }
    ]
  }
];

export default hackathonThemes;
