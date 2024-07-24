"use client";
import React, {useEffect, useState} from 'react';

const MIN_GAP = 50; // Minimum gap between elements in pixels

interface Position {
    left: number;
    top: number;
}


function generatePositions(count: number, width: number, height: number): Position[] {
    const positions: Position[] = [];
    const gridSize = Math.sqrt(count);
    const cellWidth = width / gridSize;
    const cellHeight = height / gridSize;

    for (let i = 0; i < count; i++) {
        let newPos: Position;
        let attempts = 0;
        do {
            newPos = {
                left: Math.random() * (width - MIN_GAP),
                top: Math.random() * (height - MIN_GAP),
            };
            attempts++;
        } while (
            positions.some(pos =>
                Math.abs(pos.left - newPos.left) < MIN_GAP &&
                Math.abs(pos.top - newPos.top) < MIN_GAP
            ) &&
            attempts < 100
            );

        if (attempts < 100) {
            positions.push(newPos);
        }

    }

    return positions;
}


export default function RandomName(): JSX.Element {
    const [positions, setPositions] = useState<Position[]>([]);

    useEffect(() => {
        const updatePositions = (): void => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setPositions(generatePositions(50, width, height));
        };

        updatePositions();
        window.addEventListener('resize', updatePositions);

        return () => window.removeEventListener('resize', updatePositions);
    }, []);

    console.log(positions.length);

    return (
        <section className="mt-44 font-vietnam container mx-auto relative flex items-center justify-center min-h-[50vh] overflow-hidden">
            <h4 className="text-2xl font-medium text-primary z-10">You can call me</h4>
            <div className="absolute inset-0">
                {positions.map((pos, i) => (
                    <p
                        key={i}
                        className="text-sm font-medium text-secondary absolute"
                        style={{
                            left: pos.left,
                            top: pos.top,
                            transform: `translate(-50%, -50%)`,
                        }}
                    >
                        Mutiara
                    </p>
                ))}
            </div>
        </section>
    );
}