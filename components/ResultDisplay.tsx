
import React, { useState, useCallback } from 'react';
import { AnalysisResult } from '../types';
import {
  FireIcon,
  MacrosIcon,
  HealthIcon,
  WarningIcon,
  TipIcon,
  RecipeIcon,
  ShareIcon,
  CopyIcon,
  CheckIcon
} from './IconComponents';

interface ResultDisplayProps {
  result: AnalysisResult;
}

const SectionCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <div className="text-green-500">{icon}</div>
        <h3 className="ml-3 text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <div className="text-gray-600 space-y-2">{children}</div>
    </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const shareMessage = `✅ Food: ${result.foodName}\n🔥 Calories: ${result.calories} kcal\n🍽️ Recipe: Check out how to make it!\n💡 Health Tip: ${result.healthTip}\n⚠️ Side Effects: ${result.risks.join(', ') || 'None specified'}\n\n👇 Share this post to help others eat healthy`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [shareMessage]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center p-6 bg-white rounded-xl shadow-md">
        <p className="text-gray-500 text-sm">🍔 FOOD IDENTIFIED</p>
        <h2 className="text-4xl font-extrabold text-gray-900 mt-1">{result.foodName}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex justify-center items-center text-yellow-500"><FireIcon /></div>
            <p className="mt-2 text-3xl font-bold">{result.calories} <span className="text-lg font-normal text-gray-500">kcal</span></p>
            <p className="text-sm text-gray-500">Calories per serving</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md col-span-1 md:col-span-2">
            <div className="flex justify-center items-center text-blue-500"><MacrosIcon /></div>
            <div className="mt-2 grid grid-cols-3 divide-x divide-gray-200">
                <div className="px-1">
                    <p className="text-xl font-bold">{result.macros.protein}g</p>
                    <p className="text-sm text-gray-500">Protein</p>
                </div>
                <div className="px-1">
                    <p className="text-xl font-bold">{result.macros.carbs}g</p>
                    <p className="text-sm text-gray-500">Carbs</p>
                </div>
                <div className="px-1">
                    <p className="text-xl font-bold">{result.macros.fats}g</p>
                    <p className="text-sm text-gray-500">Fats</p>
                </div>
            </div>
        </div>
      </div>
      
      <SectionCard icon={<HealthIcon />} title="Health Benefits">
        <ul className="list-disc list-inside space-y-1">
          {result.healthBenefits.map((benefit, index) => <li key={index}>{benefit}</li>)}
        </ul>
      </SectionCard>
      
      <SectionCard icon={<WarningIcon />} title="Side Effects / Risks">
        <ul className="list-disc list-inside space-y-1">
          {result.risks.map((risk, index) => <li key={index}>{risk}</li>)}
        </ul>
      </SectionCard>
      
      <SectionCard icon={<TipIcon />} title="Quick Health Tip">
        <p className="italic">"{result.healthTip}"</p>
      </SectionCard>

      <SectionCard icon={<RecipeIcon />} title="Recipe To Make It At Home">
        <div className="text-sm text-gray-500 flex justify-around mb-4 border-b pb-4">
            <span><strong>Prep Time:</strong> {result.recipe.prepTime}</span>
            <span><strong>Servings:</strong> {result.recipe.servings}</span>
        </div>
        <div>
            <h4 className="font-bold text-lg mb-2 text-gray-700">Ingredients:</h4>
            <ul className="list-disc list-inside space-y-1 pl-2">
                {result.recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
        <div className="mt-4">
            <h4 className="font-bold text-lg mb-2 text-gray-700">Steps:</h4>
            <ol className="list-decimal list-inside space-y-2 pl-2">
                {result.recipe.steps.map((step, index) => <li key={index}>{step}</li>)}
            </ol>
        </div>
      </SectionCard>

      <SectionCard icon={<ShareIcon />} title="Share-Ready Message">
          <div className="bg-gray-100 p-4 rounded-lg text-sm whitespace-pre-wrap font-mono">
              {shareMessage}
          </div>
          <button 
            onClick={handleCopy}
            className="mt-4 w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
          >
            {copied ? <CheckIcon/> : <CopyIcon/>}
            <span className="ml-2">{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
          </button>
      </SectionCard>
    </div>
  );
};

export default ResultDisplay;
