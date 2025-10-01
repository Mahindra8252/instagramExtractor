import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Globe, Users, Calendar } from "lucide-react";

const DemographicInsights = ({ demographicData }) => {
  if (!demographicData) return null;

  const { audienceGeography, genderDistribution, ageGroups } = demographicData;

  const geoData = Object.entries(audienceGeography)
    .map(([country, percent]) => ({
      name: country,
      value: parseFloat(percent),
    }))
    .sort((a, b) => b.value - a.value);

  const genderData = Object.entries(genderDistribution).map(([gender, percent]) => ({
    name: gender.charAt(0).toUpperCase() + gender.slice(1),
    value: parseFloat(percent),
  }));

  const ageData = Object.entries(ageGroups).map(([age, percent]) => ({
    name: age,
    value: parseFloat(percent),
  }));

  const GENDER_COLORS = ['#8934e4', '#C8BBF0', '#EAFD75', '#B1A2E3', '#6B6B6B'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-cardbg border-2 border-textPurple rounded-xl p-3 shadow-medium">
          <p className="text-textp font-bold">{payload[0].payload.name}</p>
          <p className="text-textPurple font-semibold text-lg">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  const GeographyChart = () => (
    <div className="bg-cardbg rounded-3xl p-6 border-2 border-dashed border-textPurple/30 hover:border-textPurple transition-colors duration-300 shadow-soft hover:shadow-medium">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple/30 rounded-xl">
          <Globe className="w-6 h-6 text-textPurple" />
        </div>
        <h3 className="text-lg font-bold text-textp">Top Countries</h3>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={geoData} layout="vertical" margin={{ left: 20, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
            <XAxis type="number" domain={[0, 100]} stroke="#6B6B6B" />
            <YAxis type="category" dataKey="name" stroke="#6B6B6B" width={80} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(200, 187, 240, 0.2)' }} />
            <Bar dataKey="value" fill="#C8BBF0" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-texts text-center">
          Showing geographic distribution of your audience
        </p>
      </div>
    </div>
  );

  const GenderChart = () => (
    <div className="bg-cardbg rounded-3xl p-6 border-2 border-dashed border-textPurple/30 hover:border-textPurple transition-colors duration-300 shadow-soft hover:shadow-medium">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple/30 rounded-xl">
          <Users className="w-6 h-6 text-textPurple" />
        </div>
        <h3 className="text-lg font-bold text-textp">Gender Split</h3>
      </div>

      <div className="h-64 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={genderData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {genderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-center gap-4 flex-wrap">
          {genderData.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: GENDER_COLORS[index % GENDER_COLORS.length] }} />
              <span className="text-xs text-texts">{item.name}: <span className="font-bold text-textPurple">{item.value}%</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AgeChart = () => (
    <div className="bg-cardbg rounded-3xl p-6 border-2 border-dashed border-textPurple/30 hover:border-textPurple transition-colors duration-300 shadow-soft hover:shadow-medium">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple/30 rounded-xl">
          <Calendar className="w-6 h-6 text-textPurple" />
        </div>
        <h3 className="text-lg font-bold text-textp">Age Distribution</h3>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ageData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
            <XAxis dataKey="name" stroke="#6B6B6B" angle={-45} textAnchor="end" height={60} />
            <YAxis domain={[0, 'auto']} stroke="#6B6B6B" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(200, 187, 240, 0.2)' }} />
            <Bar dataKey="value" fill="#C8BBF0" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-texts text-center">
          Distribution shows percentage of audience in each age group
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-textp mb-2">Audience Demographics</h2>
        <p className="text-texts">Detailed breakdown of your audience composition</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <GeographyChart />
        <GenderChart />
        <AgeChart />
      </div>
    </div>
  );
};

export default DemographicInsights;