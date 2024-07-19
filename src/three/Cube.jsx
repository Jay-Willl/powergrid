import {useRef, useEffect} from 'react';
import * as THREE from 'three';

const Cube = () => {
    const mountRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const cubeRef = useRef(null);
    const mouseRef = useRef({x: 0, y: 0});

    useEffect(() => {
        const mount = mountRef.current;

        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        cameraRef.current = camera;

        // Renderer
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        rendererRef.current = renderer;
        mount.appendChild(renderer.domElement);

        // Cube
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({color: 0xaaaaaa});
        const cube = new THREE.Mesh(geometry, material);
        cubeRef.current = cube;
        scene.add(cube);

        // Event listeners
        const handleMouseMove = (event) => {
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        const handleWindowResize = () => {
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleWindowResize);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.001;
            cube.rotation.y += 0.001;
            renderer.render(scene, camera);
        };

        animate();

        // Clean up
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleWindowResize);
            mount.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return (
        <div ref={mountRef} style={{width: '100%', height: '100%'}}>
        </div>
    );
};

export {Cube};
