import { create } from 'zustand';

export interface GeneratedImage {
    id: string;
    url: string;
    prompt: string;
    aspectRatio: string;
    style: string;
    timestamp: string;
}

interface AIState {
    prompt: string;
    isGenerating: boolean;
    generatedImages: GeneratedImage[];
    generationHistory: GeneratedImage[];

    // Settings
    aspectRatio: string;
    style: string;
    designType: string;

    // Actions
    setPrompt: (prompt: string) => void;
    setAspectRatio: (ratio: string) => void;
    setStyle: (style: string) => void;
    setDesignType: (type: string) => void;
    generateImages: () => Promise<void>;
    addToHistory: (image: GeneratedImage) => void;
}

// Mock AI Image Generation (simulated)
const mockGenerate = async (prompt: string, style: string, type: string) => {
    return new Promise<GeneratedImage[]>((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: Math.random().toString(36).substr(2, 9),
                    url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop", // Abstract AI-like image
                    prompt,
                    aspectRatio: "1:1",
                    style,
                    timestamp: new Date().toLocaleTimeString(),
                },
                {
                    id: Math.random().toString(36).substr(2, 9),
                    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", // Abstract 3D
                    prompt,
                    aspectRatio: "1:1",
                    style,
                    timestamp: new Date().toLocaleTimeString(),
                },
                {
                    id: Math.random().toString(36).substr(2, 9),
                    url: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=2664&auto=format&fit=crop", // Cyberpunk
                    prompt,
                    aspectRatio: "1:1",
                    style,
                    timestamp: new Date().toLocaleTimeString(),
                },
                {
                    id: Math.random().toString(36).substr(2, 9),
                    url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop", // Neon
                    prompt,
                    aspectRatio: "1:1",
                    style,
                    timestamp: new Date().toLocaleTimeString(),
                }
            ]);
        }, 3000); // 3 seconds delay
    });
};

export const useAIStore = create<AIState>((set, get) => ({
    prompt: "",
    isGenerating: false,
    generatedImages: [],
    generationHistory: [],
    aspectRatio: "1:1",
    style: "minimal",
    designType: "Logo",

    setPrompt: (prompt) => set({ prompt }),
    setAspectRatio: (ratio) => set({ aspectRatio: ratio }),
    setStyle: (style) => set({ style }),
    setDesignType: (type) => set({ designType: type }),

    generateImages: async () => {
        const { prompt, style, designType, generationHistory } = get();
        if (!prompt.trim()) return;

        set({ isGenerating: true, generatedImages: [] });

        try {
            // Simulate API call
            const newImages = await mockGenerate(prompt, style, designType);

            set({
                isGenerating: false,
                generatedImages: newImages,
                generationHistory: [...newImages, ...generationHistory]
            });
        } catch (error) {
            console.error("Generation failed", error);
            set({ isGenerating: false });
        }
    },

    addToHistory: (image) => set((state) => ({ generationHistory: [image, ...state.generationHistory] })),
}));
